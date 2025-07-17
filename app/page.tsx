'use client'
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';


export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <GoogleMapsProvider apiKey=''>
        <Map />
      </GoogleMapsProvider>
    </div>
  );
}



const GoogleMapsProvider = ({
  children,
  apiKey,
}: {
  children: React.ReactNode;
  apiKey: string;
}) => {

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (e.message.includes('Not initialized')) {
        window.alert('Google Maps not initialized')
      }
    };
    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  });

  const render = useCallback(
    (status: Status) => {
      if (status === Status.LOADING) {
        return <>loading</>;
      }
      if (status === Status.FAILURE) {
        return <div>Could not load Google Maps</div>;
      }
      return <>{children}</>;
    },
    [children],
  );

  return (
    <Wrapper
      // Using the Beta version is to support data driven maps in site selection map
      // while it is not possible to have both the weekly and beta version in the same context
      version="beta"
      apiKey={apiKey}
      render={render}
    />
  );
};


const Map = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      // @ts-expect-error trust me
      new window.google.maps.Map(ref.current);

    }
  }, [ref]);

  return <div className='h-96 w-96' ref={ref} />;
};