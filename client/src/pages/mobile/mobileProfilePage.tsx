import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  ChevronRight,
  LogOut,
  Bell,
  Fingerprint,
  Store,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import MobileProfileEditForm from "@/components/services/profile/MobileProfileEditForm";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { User } from "@/components/services/types/user";

export default function MobileProfilePage() {
  const [showEditForm, setShowEditForm] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user as User);

  const handleCGUClick = () => {
    window.open('https://www.google.fr', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        {/* Icône et autres éléments en haut */}
        <div className="px-4 py-6 space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage
                alt="User avatar"
                src="/placeholder.svg?height=96&width=96"
              />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-semibold">{user.profile?.first_name} {user.profile?.last_name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            {!showEditForm && (
              <Button
                variant="default"
                className="mt-2 bg-black text-white hover:bg-gray-800"
                onClick={() => setShowEditForm(!showEditForm)}
                style={{
                  backgroundColor: showEditForm ? "green" : "black",
                }}
              >
                Edit profile
              </Button>
            )}
          </div>
          {showEditForm ? (
            <MobileProfileEditForm onClose={() => setShowEditForm(false)} />
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">
                  Inventories
                </h2>
                <div className="space-y-2 bg-white rounded-lg overflow-hidden shadow-sm">
                  <Button
                    variant="ghost"
                    className="w-full justify-between py-3 px-4"
                  >
                    <div className="flex items-center space-x-3">
                      <Store className="h-5 w-5 text-gray-500" />
                      <span>My stores</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 mr-2">
                        2
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-between py-3 px-4 border-t border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-gray-500" />
                      <span>Support</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">
                  Preferences
                </h2>
                <div className="space-y-2 bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <span>Push notifications</span>
                    </div>
                    <Switch />
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between py-3 px-4 border-t border-gray-100"
                    onClick={handleCGUClick}
                  >
                    <div className="flex items-center space-x-3">
                      <Fingerprint className="h-5 w-5 text-gray-500" />
                      <span>CGU</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-between py-3 px-4 border-t border-gray-100 text-red-500"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
