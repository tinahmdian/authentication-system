'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation";
interface User {
  name: string;
  email?: string;
  avatar?: string;
}
export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router=useRouter()
  useEffect(() => {
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
      setUser(JSON.parse(activeUser));
    }
    else  router.push('/login')
  }, []);
  if (!user) {
    return null
  }
  return (
      <div className="min-h-screen bg-purple-100 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            {user.avatar ? (
                <Image
                    src={user.avatar}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full object-cover border-4 border-purple-500"
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 text-3xl font-bold border-4 border-purple-500">
                  {user.name?.charAt(0) || '?'}
                </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          {user.email && (
              <p className="text-gray-600 mt-2">{user.email}</p>
          )}
          <button
              onClick={() => {
                localStorage.removeItem('activeUser');
                window.location.href = '/login';
              }}
              className="mt-6 w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
            خروج
          </button>
        </div>
      </div>
  );
}
