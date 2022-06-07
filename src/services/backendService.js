import axios from 'axios';

const instance = axios.create(
    {
            baseURL: "http://localhost:8080",
            withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
          }
      })

const getJobTitles = async () => {
    try {
        const { data } = await instance.get(
            '/resources/titles'
        );
        return data.titles;
    }
    catch {
        throw new Error(`domain: is not exist`);
    }

}

const getDestinationJobs = async () => {
    try {
        const { data } = await instance.get(
            'resources/destination_jobs'
        );
        return data.destination_jobs;
    }
    catch(err) {
        throw new Error(`domain: is not exist` + err);
    }

}

const getDegreeTypes = async () => {
    try {
        const { data } = await instance.get(
            '/resources/degree/types'
        );
        return data.types;
    }
    catch {
        throw new Error(`domain: is not exist`);
    }

}



const getDegreeFields = async () => {
    try {
        const { data } = await instance.get(
            '/resources/degree/fields'
        );
        return data.fields;
    }
    catch(err) {
        throw new Error(`domain: is not exist` + err);
    }

}

const getDegreeInstitutions = async () => {
    try {
        const { data } = await instance.get(
            '/resources/degree/institutions'
        );
        return data.institutions;
    }
    catch {
        throw new Error(`domain: is not exist`);
    }

}

const analyze = async (req) =>{
    try{

        const response = await instance.post(
            '/analyze', req
        );

        return response.data;
    }
    catch(err) {
        throw new Error(`domain: is not exist` + err);
    }
}

export { getDegreeFields, getDegreeInstitutions, getDegreeTypes, getDestinationJobs, getJobTitles, analyze }