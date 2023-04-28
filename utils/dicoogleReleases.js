const axios = require('axios');

let releases = [];

const fetchReleases = async () => {
    const { data } = await axios.get('https://api.github.com/repos/bioinformatics-ua/dicoogle/releases');

    return data.map(
        (release) => ({
            id: release.id,
            tag_name: release.tag_name,
            published_at: release.published_at,
            downloadLink: release.assets[0]?.browser_download_url || ''
        })
    )
        .filter((release) => release.downloadLink !== '')
        .sort(
            (release1, release2) => Date.parse(release2.published_at) - Date.parse(release1.published_at)
        ).reduce((previous, current) => {
            return { ...previous, [current.tag_name]: current }
        }, {})
}

//default interval = 1h
const startFetch = (interval = 60 * 60 * 1000) => {
    fetchReleases().then((data) => releases = data);

    return setInterval(() => {
        fetchReleases().then((data) => releases = data);
    }, interval)
}

const getDicoogleReleases = () => releases;

module.exports = { fetchReleases, startFetch, getDicoogleReleases };