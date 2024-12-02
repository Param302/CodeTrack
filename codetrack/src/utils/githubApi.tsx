
const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_PAT;

export const fetchContributions = async (username: string) => {
    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
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
      }
    `;

    try {
        console.log("Token is", GITHUB_TOKEN);
        const response = await fetch(GITHUB_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        return data.data.user.contributionsCollection.contributionCalendar.weeks;
    } catch (error) {
        console.error('Error fetching contributions:', error);
        return error;
    }
};
