import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, User, Save, X } from "lucide-react"

// TS Type
interface MobileProfileEditFormProps {
  onClose: () => void;
}

// Objet contenant les valeurs de placeholder
const placeholderData = {
  email: "john.doe@example.com",
  name: "John Doe"
}

const MobileProfileEditForm: React.FC<MobileProfileEditFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const animateText = async (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
      for (let i = 0; i <= text.length; i++) {
        setter(text.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }

    animateText(placeholderData.email, setEmail)
    setTimeout(() => animateText(placeholderData.name, setName), placeholderData.email.length * 50)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Ici, vous pouvez ajouter la logique pour sauvegarder les modifications
    console.log('Email:', email, 'Nom:', name)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderData.email}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Nom</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={placeholderData.name}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} type="button" className="flex items-center space-x-1">
            <X className="w-4 h-4" />
            <span>Annuler</span>
          </Button>
          <Button type="submit" className="flex items-center space-x-1">
            <Save className="w-4 h-4" />
            <span>Enregistrer</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

export default MobileProfileEditForm
