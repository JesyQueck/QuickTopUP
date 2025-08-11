import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ userInfo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: userInfo?.fullName || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.phoneNumber?.replace('+234 ', '') || ''
  });
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      fullName: userInfo?.fullName || '',
      email: userInfo?.email || '',
      phoneNumber: userInfo?.phoneNumber?.replace('+234 ', '') || ''
    });
  };

  const handleSave = () => {
    const newErrors = {};
    
    // Validation
    if (!editForm?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!editForm?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(editForm?.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!editForm?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (editForm?.phoneNumber?.length !== 10 || !/^[0-9]+$/?.test(editForm?.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors)?.length === 0) {
      onUpdate?.({
        fullName: editForm?.fullName?.trim(),
        email: editForm?.email?.trim(),
        phoneNumber: `+234 ${editForm?.phoneNumber}`
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Personal Information</h3>
        </div>
        
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            iconName="Edit2"
            iconSize={16}
          >
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              iconName="X"
              iconSize={16}
              className="text-text-secondary"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconSize={16}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Full Name
              </label>
              <Input
                value={editForm?.fullName}
                onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e?.target?.value }))}
                error={errors?.fullName}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={editForm?.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e?.target?.value }))}
                error={errors?.email}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Phone Number
              </label>
              <div className="flex">
                <div className="flex items-center px-3 bg-accent border border-border rounded-l-lg">
                  <span className="text-sm text-text-secondary">+234</span>
                </div>
                <Input
                  type="tel"
                  value={editForm?.phoneNumber}
                  onChange={(e) => {
                    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 10);
                    setEditForm(prev => ({ ...prev, phoneNumber: value }));
                  }}
                  error={errors?.phoneNumber}
                  placeholder="8012345678"
                  className="rounded-l-none border-l-0"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <Icon name="User" size={16} className="text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Full Name</p>
                <p className="font-medium text-text-primary">{userInfo?.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-medium text-text-primary">{userInfo?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Phone Number</p>
                <p className="font-medium text-text-primary">{userInfo?.phoneNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Member Since</p>
                <p className="font-medium text-text-primary">
                  {new Date(userInfo?.joinDate)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;