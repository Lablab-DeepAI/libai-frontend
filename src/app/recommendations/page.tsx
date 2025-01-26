"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Resource } from "@/lib/types";

export default function ResourceCards() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number | null>(null);
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
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        await testInternetSpeed();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/resources`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ speed }), // You can adjust this as needed
          }
        );
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [speed]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource, index) => (
        <Card
          key={index}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => window.open(resource.url, "_blank")}
        >
          <CardHeader>
            <CardTitle>{resource.name}</CardTitle>
            <CardDescription>{resource.url}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
