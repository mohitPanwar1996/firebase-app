import { Contact, KeySquare, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Users',
    description: 'Manage your users',
    icon: <UserIcon size={24} color="#4F46E5" />,
    link: '/settings/users'
  },
  {
    title: 'Roles',
    description: 'Manage your users',
    icon: <Contact size={24} color="#4F46E5" />,
    link: '/settings/roles'
  },
  {
    title: 'Permissions',
    description: 'Manage your users',
    icon: <KeySquare  size={24} color="#4F46E5" />,
    link: '/settings/permissions'
  },

];

export default function SettingsPage() {
  return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4">Settings</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {cards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className="p-6 bg-white rounded-lg shadow cursor-pointer no-underline"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
                    {card.icon}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
  );
}
