import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserAvatar = ({ userInfo, onUpdateAvatar }) => {
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const handlePhotoSelection = (source) => {
    setShowPhotoOptions(false);
    
    if (source === 'camera') {
      // In real app, this would open camera
      console.log('Opening camera...');
    } else if (source === 'gallery') {
      // In real app, this would open gallery
      console.log('Opening gallery...');
    }
    
    // Mock photo update
    const mockPhotoUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
    onUpdateAvatar?.(mockPhotoUrl);
  };

  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 px-4 py-8">
      <div className="flex items-center space-x-4">
        {/* Avatar with Edit Button */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
            {userInfo?.profileImage ? (
              <img 
                src={userInfo?.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <Icon name="User" size={32} color="white" />
              </div>
            )}
          </div>
          
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowPhotoOptions(true)}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-primary hover:bg-gray-50 shadow-lg"
          >
            <Icon name="Camera" size={14} />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-white">
          <p className="text-sm opacity-90 mb-1">
            {getGreeting()},
          </p>
          <h2 className="text-xl font-bold mb-1">
            {userInfo?.fullName}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm opacity-90">
              {userInfo?.accountType} Account
            </span>
            {userInfo?.isVerified && (
              <div className="flex items-center space-x-1 bg-white/20 px-2 py-0.5 rounded-full">
                <Icon name="CheckCircle" size={12} />
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Photo Options Modal */}
      {showPhotoOptions && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={() => setShowPhotoOptions(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl border-t border-border shadow-elevated z-modal animate-slide-up">
            <div className="p-4">
              <div className="w-12 h-1 bg-divider rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
                Update Profile Photo
              </h3>
              
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handlePhotoSelection('camera')}
                  iconName="Camera"
                  className="w-full justify-start"
                >
                  Take Photo
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handlePhotoSelection('gallery')}
                  iconName="Image"
                  className="w-full justify-start"
                >
                  Choose from Gallery
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowPhotoOptions(false)}
                  iconName="X"
                  className="w-full justify-start text-text-secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAvatar;