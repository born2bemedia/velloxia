// lib/useCountryCode.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useCountryCode = () => {
  const [countryCode, setCountryCode] = useState('us'); // Default to "us"

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const { data: { ip } } = ipResponse;
        const countryResponse = await axios.get(`https://ipinfo.io/${ip}?token=a1de4b6d03b20a`);
        setCountryCode(countryResponse.data.country.toLowerCase());
      } catch (error) {
        console.error('Error fetching country code:', error);
      }
    };

    fetchCountryCode();
  }, []);

  return countryCode;
};

export default useCountryCode;
