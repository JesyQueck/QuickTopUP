import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceGrid = () => {
  const services = [
    {
      id: 'airtime',
      title: 'Buy Airtime',
      description: 'Top up your phone instantly',
      icon: 'Phone',
      route: '/buy-airtime-screen',
      gradient: 'from-blue-500 to-blue-600',
      providers: ['MTN', 'Airtel', 'Glo', '9mobile']
    },
    {
      id: 'data',
      title: 'Buy Data',
      description: 'Get data bundles for all networks',
      icon: 'Wifi',
      route: '/buy-data-screen',
      gradient: 'from-green-500 to-green-600',
      providers: ['MTN', 'Airtel', 'Glo', '9mobile']
    }
  ];

  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services?.map((service) => (
          <Link
            key={service?.id}
            to={service?.route}
            className="group"
          >
            <div className="mobile-card p-6 hover:shadow-md transition-all duration-200 group-active:scale-95">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service?.gradient} flex items-center justify-center mb-4`}>
                <Icon name={service?.icon} size={24} color="white" />
              </div>
              
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {service?.title}
              </h4>
              <p className="text-text-secondary text-sm mb-4">
                {service?.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {service?.providers?.slice(0, 3)?.map((provider, index) => (
                    <div
                      key={provider}
                      className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center"
                      style={{ zIndex: service?.providers?.length - index }}
                    >
                      <span className="text-xs font-medium text-text-secondary">
                        {provider?.charAt(0)}
                      </span>
                    </div>
                  ))}
                  {service?.providers?.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                      <span className="text-xs font-medium text-text-secondary">
                        +{service?.providers?.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-text-secondary">
                  All networks supported
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;