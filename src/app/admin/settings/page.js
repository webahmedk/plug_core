'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

export default function SettingsPage() {
  // Mock settings state
  const [settings, setSettings] = useState({
    siteName: 'House of Plug',
    enableNotifications: true,
    defaultRole: 'customer',
    maintenanceMode: false,
  });

  const roles = [
    { label: 'Customer', value: 'customer' },
    { label: 'Admin', value: 'admin' },
    { label: 'Operations', value: 'operations' },
    { label: 'Designer', value: 'designer' },
    { label: 'Marketing', value: 'marketing' },
  ];

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    console.log('Saved settings:', settings);
    alert('Settings saved (mock)');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        {/* Site Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Site Name</label>
          <InputText
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Enable Notifications */}
        <div className="mb-4 flex items-center gap-4">
          <label className="text-gray-700">Enable Notifications</label>
          <InputSwitch
            checked={settings.enableNotifications}
            onChange={(e) => handleChange('enableNotifications', e.value)}
          />
        </div>

        {/* Default Role */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Default Role</label>
          <Dropdown
            value={settings.defaultRole}
            options={roles}
            onChange={(e) => handleChange('defaultRole', e.value)}
            placeholder="Select Role"
            className="w-full"
          />
        </div>

        {/* Maintenance Mode */}
        <div className="mb-4 flex items-center gap-4">
          <label className="text-gray-700">Maintenance Mode</label>
          <InputSwitch
            checked={settings.maintenanceMode}
            onChange={(e) => handleChange('maintenanceMode', e.value)}
          />
        </div>

        <div className="mt-6">
          <Button label="Save Settings" icon="pi pi-check" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
