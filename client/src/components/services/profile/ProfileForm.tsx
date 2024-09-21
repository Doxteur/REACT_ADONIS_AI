'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ProfileForm() {
  const [profileData, setProfileData] = useState({
    name: "Rafiqur Rahman",
    role: "Team Manager",
    location: "Leeds, United Kingdom",
    avatar: "/placeholder.svg?height=80&width=80",
    personalInfo: {
      firstName: "Rafiqur",
      lastName: "Rahman",
      email: "rafiqurrahman51@gmail.com",
      phone: "+09 345 346 46",
      bio: "Team Manager",
    },
    address: {
      country: "United Kingdom",
      cityState: "Leeds, East London",
      postalCode: "ERT 2354",
      taxId: "AS45645756",
    },
  });

  const [editingSection, setEditingSection] = useState<'personalInfo' | 'address' | null>(null);

  const handleEdit = (section: 'personalInfo' | 'address') => {
    setEditingSection(section);
  };

  const handleSave = () => {
    setEditingSection(null);
    console.log(profileData);
    // Ici, vous pouvez ajouter la logique pour sauvegarder les modifications
  };

  const handleCancel = () => {
    setEditingSection(null);
    // Réinitialiser les modifications si nécessaire
  };

  const renderEditableField = (section: 'personalInfo' | 'address', key: string, value: string) => {
    if (editingSection === section) {
      return (
        <Input
          value={value}
          onChange={(e) => {
            setProfileData((prev) => ({
              ...prev,
              [section]: {
                ...prev[section],
                [key]: e.target.value,
              },
            }));
          }}
        />
      );
    }
    return <p>{value}</p>;
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4 p-4 border rounded-lg">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{profileData.name}</h2>
            <p className="text-sm text-gray-500">{profileData.role}</p>
            <p className="text-sm text-gray-500">{profileData.location}</p>
          </div>
        </div>

        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            {editingSection === 'personalInfo' ? (
              <div>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit('personalInfo')}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profileData.personalInfo).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                {renderEditableField('personalInfo', key, value)}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Address</h3>
            {editingSection === 'address' ? (
              <div>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit('address')}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profileData.address).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                {renderEditableField('address', key, value)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
