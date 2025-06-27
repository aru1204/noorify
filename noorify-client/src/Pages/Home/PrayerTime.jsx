import React, { useState, useEffect } from 'react';
import { BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs';

import { FaSun, FaMoon, FaCloudMoon } from 'react-icons/fa';
import { PiCloudMoonFill, PiSunHorizonFill } from 'react-icons/pi';
import Swal from 'sweetalert2';


// প্রার্থনার নাম ও তাদের আইকনসমূহের ম্যাপিং
const prayerData = {
  Fajr: { name: 'ফজর', icon: <FaCloudMoon /> },
  Sunrise: { name: 'সূর্যোদয়', icon: <BsFillSunriseFill /> },
  Dhuhr: { name: 'যোহর', icon: <FaSun /> },
  Asr: { name: 'আসর', icon: <PiSunHorizonFill /> },
  Sunset: { name: 'সূর্যাস্ত', icon: <BsFillSunsetFill /> },
  Maghrib: { name: 'মাগরিব', icon: <PiCloudMoonFill /> },
  Isha: { name: 'ইশা', icon: <FaMoon /> },
};

// সময়কে ১২-ঘণ্টা ফরম্যাটে রূপান্তর করার ফাংশন
const convertTo12HourFormat = (time24) => {
  const [hour, minute] = time24.split(':');
  const hourNum = parseInt(hour, 10);
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 || 12;
  return `${hour12}:${minute} ${period}`;
};

const PrayerTimes = () => {
  const [location, setLocation] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // সেশন স্টোরেজ থেকে লোকেশন তথ্য পাওয়া
    const storedLocation = sessionStorage.getItem('userLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    } else {
      // লোকেশন অনুমতি চাওয়া
      Swal.fire({
        title: 'Enable locarion for Prayer time',
        text: 'Allow location access to get Prayer times.',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLocation = { latitude, longitude };
              // লোকেশন তথ্য সেশন স্টোরেজে সংরক্ষণ
              sessionStorage.setItem('userLocation', JSON.stringify(userLocation));
              setLocation(userLocation);
            },
            (err) => {
              setError('লোকেশন অনুমতি পাওয়া যায়নি।');
            }
          );
        } else {
          setError('আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না।');
        }
      });
    }
  }, []);

  useEffect(() => {
    // লোকেশন পাওয়ার পর প্রার্থনার সময়সূচি আনয়ন
    if (location) {
      const { latitude, longitude } = location;
      const today = new Date();
      const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

      fetch(
        `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=2`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            setPrayerTimes(data.data.timings);
          } else {
            setError('প্রার্থনার সময়সূচি আনয়নে সমস্যা হয়েছে।');
          }
        })
        .catch(() => {
          setError('প্রার্থনার সময়সূচি আনয়নে সমস্যা হয়েছে।');
        });
    }
  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!prayerTimes) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <div>
        <h1 className='md:mt-20 mt-10 pb-10 md:pb-10 text-2xl text-white font-semibold text-center '>Prayer time</h1>
      </div>

      <div className='bg-white md:p-10 p-5 rounded-xl'>
        <h2 className='pb-8 text-xl text-center font-bold'>আজকের নামাজের সময়সূচি</h2>
        <ul className='space-y-4 '>
          {Object.entries(prayerTimes).map(([key, time]) => {
            if (prayerData[key]) {
              return (
                <li className='flex gap-10 items-center text-xl text-[#013a2c] font-bold ' key={key}>
                  {prayerData[key].icon} {prayerData[key].name} - {convertTo12HourFormat(time)}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PrayerTimes;
