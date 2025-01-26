"use client";

import React, { useState, useEffect } from "react";

const RealTimeInternetSpeed: React.FC = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const speedLimit: number = 5;

  // Function to test internet speed
  const testInternetSpeed = async () => {
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Pizigani_1367_Chart_1MB.jpg/2560px-Pizigani_1367_Chart_1MB.jpg"; // A file of known size
    const fileSizeInBytes = 1440000; // file size in bytes
    const startTime = performance.now();
    try {
      await fetch(imageUrl, { cache: "no-cache" });
      const endTime = performance.now();
      const durationInSeconds = (endTime - startTime) / 1000;
      const speedInMbps =
        (fileSizeInBytes * 8) / (durationInSeconds * 1024 * 1024); // Mbps
      setSpeed(speedInMbps);
    } catch (error) {
      console.error("Error testing internet speed:", error);
      setSpeed(null);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // Run speed test initially
    testInternetSpeed().then(() => setIsLoading(false));
    // Set an interval to check the speed periodically
    const intervalId = setInterval(() => {
      testInternetSpeed();
    }, 5000); // Check every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Real-Time Internet Speed</h1>

      {isLoading ? (
        <p className="text-gray-500">Testing your internet speed...</p>
      ) : speed !== null ? (
        <>
          <p className="text-lg">
            Your internet speed is:&nbsp;
            <span className="font-bold">{speed.toFixed(2)} Mbps</span>
          </p>
          {speed >= speedLimit ? (
            <div className="mt-4 bg-green-100 p-4 rounded-lg shadow">
              <h2 className="text-green-600 text-xl font-semibold">
                Content is Visible
              </h2>
              <p className="text-green-700">
                Your internet speed is good enough to load this content.
              </p>
            </div>
          ) : (
            <div className="mt-4 bg-red-100 p-4 rounded-lg shadow">
              <h2 className="text-red-600 text-xl font-semibold">
                Content Hidden
              </h2>
              <p className="text-red-700">
                Your internet speed is too slow to load this content.
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500">Unable to determine your internet speed.</p>
      )}
    </div>
  );
};

export default RealTimeInternetSpeed;
