/**
 * Example usage of useLogin, useProfile, and useUpdateProfile.
 * No API calls inside the component — all via custom hooks.
 */
import { useState } from 'react';
import { useLogin, useProfile, useUpdateProfile } from '../../hooks/queries';

export function ProfileExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editName, setEditName] = useState('');

  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const loginMutation = useLogin();
  const updateProfileMutation = useUpdateProfile();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateProfileMutation.mutate(
      { name: editName.trim() },
      {
        onSuccess: () => setEditName(''),
      }
    );
  };

  return (
    <div className="p-4 space-y-6 max-w-md">
      {/* Login */}
      <form onSubmit={handleLogin} className="space-y-2">
        <h3 className="font-semibold">Login (useLogin)</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded px-2 py-1"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded px-2 py-1"
          required
        />
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loginMutation.isPending ? 'Logging in…' : 'Log in'}
        </button>
        {loginMutation.isError && (
          <p className="text-red-600 text-sm">
            {loginMutation.error?.message ?? 'Login failed'}
          </p>
        )}
      </form>

      {/* Profile (useProfile) */}
      <section>
        <h3 className="font-semibold">Profile (useProfile)</h3>
        {profileLoading && <p>Loading profile…</p>}
        {profileError && (
          <p className="text-red-600 text-sm">
            {profileError?.message ?? 'Failed to load profile'}
          </p>
        )}
        {profile && (
          <p>
            {profile.name ?? profile.email} — {profile.email}
          </p>
        )}
      </section>

      {/* Update profile (useUpdateProfile) */}
      <form onSubmit={handleUpdateProfile} className="space-y-2">
        <h3 className="font-semibold">Update name (useUpdateProfile)</h3>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="New display name"
          className="w-full border rounded px-2 py-1"
        />
        <button
          type="submit"
          disabled={updateProfileMutation.isPending || !editName.trim()}
          className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {updateProfileMutation.isPending ? 'Saving…' : 'Save'}
        </button>
        {updateProfileMutation.isSuccess && (
          <p className="text-green-600 text-sm">Profile updated.</p>
        )}
        {updateProfileMutation.isError && (
          <p className="text-red-600 text-sm">
            {updateProfileMutation.error?.message ?? 'Update failed'}
          </p>
        )}
      </form>
    </div>
  );
}
