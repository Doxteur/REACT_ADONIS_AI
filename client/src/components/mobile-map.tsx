import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'
import { Geolocation } from '@capacitor/geolocation'

// Utilisez cette approche à la place
// L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/';

// L.Icon.Default.mergeOptions({
// iconRetinaUrl: 'marker-icon-2x.png',
// iconUrl: 'marker-icon.png',
// shadowUrl: 'marker-shadow.png',
// })

export function MobileMapComponent() {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 51.505, lng: -0.09 })
  const [isClient, setIsClient] = useState(false)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCk8OvEfY4DwsYeGZCGlIGaStAyDr-TWGs"
  })

  useEffect(() => {
    setIsClient(true)
    const getCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition()
        console.log(coordinates)
        setPosition({
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude
        })
      } catch (error) {
        console.error("Erreur lors de la récupération de la position :", error)
      }
    }
    getCurrentPosition()
  }, [])

  if (!isClient || !isLoaded) return null

  return (
    <div className="relative h-screen w-full">
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={position}
        zoom={13}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  )
}
