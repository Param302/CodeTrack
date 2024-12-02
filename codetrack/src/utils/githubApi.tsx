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

const fetchUserDetails = async (username: string): Promise<UserDetails | null> => {
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

const fetchContributions = async (username: string, fromDate: string, toDate: string) => {

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
        });
        const data = await response.json();
        console.log("RAW cont", data);

        if ('data' in data) {
            return data.data.user.contributionsCollection.contributionCalendar.weeks;
        }
        return data.contributionsCollection.contributionCalendar.weeks;
    } catch (error) {
        console.error('Error fetching contributions:', error);
        return null;
    }
};

export const getUserDetails = async (username: string) => {
    const userDetails = await fetchUserDetails(username);
    console.log("User details", userDetails);

    if (!userDetails) {
        return { userDetails: null, contributions: null };
    }
    const [year, month, date] = userDetails.createdAt.split('T')[0].split('-').map(Number);
    const createdAt = new Date(year, month - 1, date);
    const toDate = new Date();
    console.log("Created at", createdAt);

    let contributions: ContributionWeek[] = [];

    let currentDate = createdAt;

    while (currentDate <= toDate) {
        const fromDate = currentDate.toISOString();
        let toDate = new Date(currentDate.getFullYear() + 1, 0, 1).toISOString();
        if (toDate > new Date().toISOString()) {
            toDate = new Date().toISOString();
        };
        console.log("From date", fromDate);
        console.log("To date", toDate);

        const yearlyContributions = await fetchContributions(username, fromDate, toDate);
        if (yearlyContributions) {
            contributions = contributions.concat(yearlyContributions);
        }
        currentDate = new Date(currentDate.getFullYear() + 1, 0, 1);
        console.log("Now currentDate", currentDate);
    }

    console.log("Contributions", contributions);

    return { userDetails, contributions };
};