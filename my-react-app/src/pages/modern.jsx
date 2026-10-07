import { useState, useEffect } from 'react';

export default function Modern() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Accessing the key from Vite environment variables
        const apiKey = import.meta.env.VITE_PHOTO_API_KEY; 
        
        // Pass the key as a query param or header, depending on your API docs
        const response = await fetch(`https://example.com?api_key=${apiKey}`);
        const data = await response.json();
        
        setPhotos(data.results); // Adjust based on your API's JSON body shape
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading images...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {photos.map((photo) => (
        <img 
          key={photo.id} 
          src={photo.urls.regular}  // Adjust key depending on API response
          alt={photo.alt_description || "API Photo"} 
          style={{ width: '100%', borderRadius: '8px' }}
        />
      ))}
    </div>
  );
}
