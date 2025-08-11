import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountManagement = ({ userInfo }) => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const getVerificationStatus = () => {
    if (userInfo?.isVerified) {
      return {
        status: 'Verified',
        color: 'text-success',
        bgColor: 'bg-success/10',
        icon: 'CheckCircle'
      };
    }
    return {
      status: 'Pending',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'Clock'
    };
  };

  const verificationStatus = getVerificationStatus();

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">Account Management</h3>
      </div>
      <div className="space-y-4">
        {/* Wallet Management */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Wallet" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Wallet Management</p>
              <p className="text-sm text-text-secondary">View balance and transaction limits</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWalletModal(true)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Transaction Limits */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Transaction Limits</p>
              <p className="text-sm text-text-secondary">Daily limit: {formatCurrency(userInfo?.walletLimit || 0)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Account Verification */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Account Verification</p>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${verificationStatus?.bgColor} ${verificationStatus?.color}`}>
                  <Icon name={verificationStatus?.icon} size={12} className="mr-1" />
                  {verificationStatus?.status}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowVerificationModal(true)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Data Export */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Export Data</p>
              <p className="text-sm text-text-secondary">Download your account data</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Trash2" size={16} className="text-destructive" />
            <div>
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-text-secondary">Permanently remove your account</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
            className="text-destructive hover:text-destructive"
          />
        </div>
      </div>
      {/* Wallet Management Modal */}
      {showWalletModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={() => setShowWalletModal(false)}
          />
          <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-card rounded-xl border border-border shadow-elevated z-modal max-w-md mx-auto">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Wallet" size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Wallet Information</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-divider">
                  <span className="text-text-secondary">Account Type</span>
                  <span className="font-medium text-text-primary">{userInfo?.accountType}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-divider">
                  <span className="text-text-secondary">Daily Limit</span>
                  <span className="font-medium text-text-primary">{formatCurrency(userInfo?.walletLimit || 0)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-divider">
                  <span className="text-text-secondary">Monthly Limit</span>
                  <span className="font-medium text-text-primary">{formatCurrency((userInfo?.walletLimit || 0) * 30)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-secondary">KYC Status</span>
                  <span className={`font-medium ${userInfo?.isVerified ? 'text-success' : 'text-warning'}`}>
                    {userInfo?.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <Button
                variant="default"
                size="lg"
                onClick={() => setShowWalletModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
      {/* Verification Modal */}
      {showVerificationModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={() => setShowVerificationModal(false)}
          />
          <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-card rounded-xl border border-border shadow-elevated z-modal max-w-md mx-auto">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${verificationStatus?.bgColor}`}>
                  <Icon name={verificationStatus?.icon} size={24} className={verificationStatus?.color} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Account Verification</h3>
                <p className="text-sm text-text-secondary">
                  {userInfo?.isVerified 
                    ? 'Your account is fully verified and ready to use.'
                    : 'Complete your account verification to increase your transaction limits.'
                  }
                </p>
              </div>
              
              {!userInfo?.isVerified && (
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                    <Icon name="FileText" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Upload ID Document</span>
                    <Icon name="Check" size={16} className="text-success ml-auto" />
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                    <Icon name="Camera" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Take Selfie</span>
                    <Icon name="Clock" size={16} className="text-warning ml-auto" />
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                    <Icon name="MapPin" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Address Verification</span>
                    <Icon name="X" size={16} className="text-destructive ml-auto" />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVerificationModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                {!userInfo?.isVerified && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setShowVerificationModal(false);
                      // Navigate to verification flow
                      console.log('Navigate to verification');
                    }}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountManagement;