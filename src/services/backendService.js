import axios from 'axios';

const instance = axios.create(
    {
        baseURL: "http://127.0.0.1:4000",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })

const getJobTitles = async () => {
    try {
        const resaponse = await instance.get(
            '/resources/titles'
        );
        return resaponse.data.titles;
    }
    catch (err) {
        console.log(`Inernal Server Error` + err);
    }

}

const getDestinationJobs = async () => {
    try {
        const resaponse = await instance.get(
            '/resources/destination_jobs'
        );
        return resaponse.data.destination_jobs;
    }
    catch (err) {
        console.log(`Inernal Server Error` + err);
    }

}

const getDegreeTypes = async () => {
    try {
        const resaponse = await instance.get(
            '/resources/degree/types'
        );
        return resaponse.data.types;
    }
    catch (err) {
        console.log(`Inernal Server Error` + err);
    }

}

const getDegreeFields = async () => {
    try {
        const resaponse = await instance.get(
            '/resources/degree/fields'
        );
        return resaponse.data.fields;
    }
    catch (err) {
        console.log(`Inernal Server Error` + err);
    }

}

const getDegreeInstitutions = async () => {
    try {
        const resaponse = await instance.get(
            '/resources/degree/institutions'
        );
        return resaponse.data.institutions;
    }
    catch (err) {
        console.log(`Inernal Server Error` + err);
    }

}

const getProfileData = async (profile_id) => {
    try {
        const resaponse = await instance.get(
            `/resources/linkedin/profile/${profile_id}`
        );
        return resaponse.data;
    }
    catch (err) {
        console.log(`Inernal Server Error` + err);
    }

}

const analyze = async (req) => {
    try {

        const response = await instance.post(
            '/analyze', req
        );

        const data = response.data;

        return data;

    }
    catch (err) {
        console.log(`Inernal Server Error` + err);

    }
}

export { getDegreeFields, getDegreeInstitutions, getDegreeTypes, getDestinationJobs, getJobTitles, analyze, getProfileData }