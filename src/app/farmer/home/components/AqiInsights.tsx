"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Cloud, AlertTriangle } from "lucide-react";

interface AqiData {
  aqi: number;
  mainPollutant: string;
  description: string;
}

export function AqiInsights() {
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Get AQI Description
  const getAqiDescription = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "Good - Air quality is satisfactory.";
      case 2:
        return "Moderate - Acceptable but may affect sensitive groups.";
      case 3:
        return "Unhealthy for Sensitive Groups.";
      case 4:
        return "Unhealthy - Everyone may experience discomfort.";
      case 5:
        return "Very Unhealthy - Health effects are severe.";
      default:
        return "Unknown AQI data";
    }
  };

  // Fetch AQI Data Based on Location
  const fetchAqiData = async (latitude: number, longitude: number) => {
    const apiKey = "f134ceb327ff9664aea3c7494bedea87"; 
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      const aqiValue = response.data.list[0].main.aqi;
      const components = response.data.list[0].components;

      const mainPollutant = getMainPollutant(components);

      setAqiData({
        aqi: aqiValue,
        mainPollutant,
        description: getAqiDescription(aqiValue),
      });
    } catch (err) {
      console.error("Error fetching AQI data:", err);
      setError("Failed to fetch AQI data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMainPollutant = (components: any) => {
    const pollutantMap = {
      pm2_5: "PM2.5",
      pm10: "PM10",
      no2: "NO2",
      so2: "SO2",
      o3: "Ozone",
      co: "CO",
    };

    let maxPollutant = "Unknown";
    let maxConcentration = 0;

    Object.keys(components).forEach((key) => {
      if (components[key] > maxConcentration) {
        maxConcentration = components[key];
        maxPollutant = pollutantMap[key as keyof typeof pollutantMap] || "Unknown";
      }
    });

    return maxPollutant;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          fetchAqiData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Location access denied or unavailable.");
          setLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported.");
      setLoading(false);
    }
  };


  useEffect(() => {
    getLocation();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Fetching AQI data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* ✅ AQI Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Current AQI</p>
                <p
                  className={`text-2xl font-bold ${
                    (aqiData?.aqi ?? 0) <= 2
                      ? "text-green-600"
                      : aqiData?.aqi === 3
                      ? "text-yellow-500"
                      : aqiData?.aqi === 4
                      ? "text-orange-600"
                      : "text-red-700"
                  }`}
                >
                  {aqiData?.aqi} - {aqiData?.description}
                </p>
              </div>
              {(aqiData?.aqi ?? 0) <= 2 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* ✅ Main Pollutant Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Main Pollutant</p>
                <p className="text-2xl font-bold">{aqiData?.mainPollutant}</p>
              </div>
              <Cloud className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* ✅ Health Advisory Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Health Advisory</p>
                <p className="text-md text-gray-700">{aqiData?.description}</p>
              </div>
              <AlertTriangle
                className={`h-4 w-4 ${
                  (aqiData?.aqi ?? 0) <= 2 ? "text-green-500" : "text-red-600"
                }`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
