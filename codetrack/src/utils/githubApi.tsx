const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_PAT;

type UserDetails = {
    name: string;
    createdAt: string;
    avatarUrl: string;
    bio: string;
    pronouns: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
};

type ContributionDay = {
    date: string;
    contributionCount: number;
};

type ContributionWeek = {
    contributionDays: ContributionDay[];
};

type ContributionsMap = {
    [date: string]: number;
};

type UserDetailsAndContributions = {
    userDetails: UserDetails | null;
    contributions: ContributionsMap | null;
};

type UserDetailsMap = {
    [username: string]: UserDetailsAndContributions;
};

let userDetailsAndContributions: UserDetailsMap = {};

const userQuery = `
query($username: String!) {
    user(login: $username) {
        name
        createdAt
        avatarUrl
        bio
        pronouns
        followers {
            totalCount
        }
        following {
            totalCount
        }
        repositories {
            totalCount
        }
    }
}`;

const contributionsQuery = `
query($username: String!, $fromDate: DateTime!, $toDate: DateTime!) {
    user(login: $username) {
        contributionsCollection(from: $fromDate, to: $toDate) {
            contributionCalendar {
                weeks {
                    contributionDays {
                        date
                        contributionCount
                    }
                }
            }
        }
    }
}`;

export const fetchUserDetails = async (username: string): Promise<UserDetails | null> => {
    try {
        const response = await fetch(GITHUB_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: userQuery,
                variables: { username }
            }),
        });
        const data = await response.json();
        if ('data' in data) {
            return data.data.user;
        }
        return data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};

export const fetchPreviousYearContributions = async (username: string, fromDate: string, toDate: string) => {

    try {
        const response = await fetch(GITHUB_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: contributionsQuery,
                variables: {
                    username,
                    fromDate,
                    toDate
                }
            }),
            cache: 'force-cache'
        });
        const data = await response.json();
        return data.data.user.contributionsCollection.contributionCalendar.weeks;
    } catch (error) {
        console.error('Error fetching contributions:', error);
        return null;
    }
};

const fetchCurrentYearContributions = async (username: string) => {
    const currentDate = new Date();
    try {
        const response = await fetch(GITHUB_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: contributionsQuery,
                variables: { username, fromDate: new Date(currentDate.getFullYear(), 0, 1).toISOString(), toDate: currentDate.toISOString() }
            }),
            cache: 'no-store'
        });
        const data = await response.json();
        return data.data.user.contributionsCollection.contributionCalendar.weeks;
    } catch (error) {
        console.error('Error fetching current year contributions:', error);
        return null;
    }


}

// Helper function to convert weeks array to contributions map
const convertWeeksToContributionsMap = (weeks: ContributionWeek[]): ContributionsMap => {
    return weeks.reduce((acc: ContributionsMap, week) => {
        week.contributionDays.forEach(day => {
            acc[day.date] = day.contributionCount;
        });
        return acc;
    }, {});
};

export const getUserDetails = async (username: string) => {
    const userDetails = await fetchUserDetails(username);
    console.log("User details", userDetails);
    userDetailsAndContributions[username] = { userDetails, contributions: {} };

    if (!userDetails) {
        return { userDetails: null, contributions: null };
    }
    const [year, month, date] = userDetails.createdAt.split('T')[0].split('-').map(Number);
    const createdAt = new Date(year, month - 1, date);
    const lastDate = new Date(new Date().getFullYear(), 11, 31);
    console.log("End date", lastDate);
    console.log("Created at", createdAt);

    let currentDate = createdAt;

    while (currentDate <= lastDate) {
        const fromDate = currentDate.toISOString();
        let toDate = new Date(currentDate.getFullYear() + 1, 0, 1).toISOString();
        if (toDate > lastDate.toISOString()) {
            toDate = lastDate.toISOString();
        };
        console.log("From date", fromDate);
        console.log("To date", toDate);

        const yearlyContributions = await fetchPreviousYearContributions(username, fromDate, toDate);
        if (yearlyContributions) {
            const contributionsMap = convertWeeksToContributionsMap(yearlyContributions);
            userDetailsAndContributions[username].contributions = {
                ...userDetailsAndContributions[username].contributions,
                ...contributionsMap
            };
        }
        currentDate = new Date(currentDate.getFullYear() + 1, 0, 1);
        console.log("Now currentDate", currentDate);
    }
    
    console.log("Contributions", userDetailsAndContributions[username].contributions);

    return userDetailsAndContributions[username];
};

export const updateUserDetails = async (username: string) => {
    const userDetails = await fetchUserDetails(username);
    console.log("User details", userDetails);

    const currentYearContributions = await fetchCurrentYearContributions(username);
    if (currentYearContributions) {
        const contributionsMap = convertWeeksToContributionsMap(currentYearContributions);
        userDetailsAndContributions[username].contributions = {
            ...userDetailsAndContributions[username].contributions,
            ...contributionsMap
        };
    }
    console.log("Current year contributions", userDetailsAndContributions[username].contributions);

    return userDetailsAndContributions[username];
};
