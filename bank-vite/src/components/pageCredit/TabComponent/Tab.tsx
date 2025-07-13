import React, { useState } from 'react';
import FeaturesSection from './Tabs/FeaturesSection/FeaturesSection';

import './_tab.scss';

const tabs = ['About card', 'Rates and conditions', 'Cashback', 'FAQ'];

const Tab: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <FeaturesSection />;
      case 1:
        return <div>Rates and conditions content</div>;
      case 2:
        return <div>Cashback content</div>;
      case 3:
        return <div>FAQ content</div>;
      default:
        return null;
    }
  };

  return (
    <section className='choice'>
      <div className='container'>
        <div className='choice__header'>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={
                activeTab === index ? 'choice__button choice__button--active' : 'choice__button'
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='choice__content'>{renderTabContent()}</div>
      </div>
    </section>
  );
};

export default Tab;
