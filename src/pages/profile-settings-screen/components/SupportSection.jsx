import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportSection = () => {
  const handleSupportAction = (action) => {
    switch (action) {
      case 'help': console.log('Navigate to help center');
        // In real app, navigate to help center
        break;
      case 'contact': console.log('Open contact support');
        // In real app, open contact form or chat
        break;
      case 'faq': console.log('Navigate to FAQ');
        // In real app, navigate to FAQ section
        break;
      case 'feedback': console.log('Open feedback form');
        // In real app, open feedback form
        break;
      case 'terms': console.log('Navigate to terms of service');
        // In real app, navigate to terms
        break;
      case 'privacy': console.log('Navigate to privacy policy');
        // In real app, navigate to privacy policy
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="HelpCircle" size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">Support & Help</h3>
      </div>

      <div className="space-y-4">
        {/* Help Center */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Book" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Help Center</p>
              <p className="text-sm text-text-secondary">Browse articles and guides</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSupportAction('help')}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Contact Support */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="MessageCircle" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Contact Support</p>
              <p className="text-sm text-text-secondary">Chat with our support team</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSupportAction('contact')}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* FAQ */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="HelpCircle" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">FAQ</p>
              <p className="text-sm text-text-secondary">Frequently asked questions</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSupportAction('faq')}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Report a Problem */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Flag" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Report a Problem</p>
              <p className="text-sm text-text-secondary">Report issues or bugs</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSupportAction('feedback')}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* App Info */}
        <div className="border-t border-divider pt-4 mt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-text-secondary">App Version</span>
              <span className="text-sm font-medium text-text-primary">1.2.0</span>
            </div>
            
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-text-secondary">Build Number</span>
              <span className="text-sm font-medium text-text-primary">120</span>
            </div>
            
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-text-secondary">Last Updated</span>
              <span className="text-sm font-medium text-text-primary">Dec 8, 2024</span>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-divider pt-4 mt-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSupportAction('terms')}
              className="w-full justify-between"
            >
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-text-secondary" />
                <span className="font-medium text-text-primary">Terms of Service</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSupportAction('privacy')}
              className="w-full justify-between"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={16} className="text-text-secondary" />
                <span className="font-medium text-text-primary">Privacy Policy</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Rate App */}
        <div className="border-t border-divider pt-4 mt-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            iconName="Star"
          >
            Rate QuickTopUp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;