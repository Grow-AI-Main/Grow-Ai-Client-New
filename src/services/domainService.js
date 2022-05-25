import axios from 'axios';

export const getDomainCard = async (domainName) => {
    try {
        const { data } = await axios.get(
            'localhost:8080/api/domain/domainData',
            {
                params: {
                    domain: domainName,
                },
            },
        );
        return data;
    }
    catch {
        throw new Error(`domain: ${domainName} is not exist`);
    }

}