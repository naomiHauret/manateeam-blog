export async function fetchLatestGithubRepo() {
    const res = await fetch('https://api.github.com/orgs/Manateeam/repos?per_page=3&page=1') 
    if (res.ok) return res.json()
    if (res.status === 404) return {}
    throw new Error(`Fetching Manateeam org github repositories failed with code: ${res.status}`)
}