
 
import React, { useEffect, useState } from 'react';
import fetchData from './Api/FetchApi';
  // Roles state for assigning roles


  // Fetch all roles when needed
const UserManagementsPage = () => {
                        const [removing, setRemoving] = React.useState(false);
                          const [removeError, setRemoveError] = React.useState(null);
      const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [rolesError, setRolesError] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRoleUserId, setSelectedRoleUserId] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [assignRoleLoading, setAssignRoleLoading] = useState(false);
  const [assignRoleError, setAssignRoleError] = useState(null);
  const [assignRoleSuccess, setAssignRoleSuccess] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const openRoleModal = async (userId) => {
    setSelectedRoleUserId(userId);
    setShowRoleModal(true);
    setSelectedRoleId('');
    setAssignRoleError(null);
    setAssignRoleSuccess(null);
    setRolesLoading(true);
    setRolesError(null);
    try {
      const data = await fetchData('roles', 'GET');
      setRoles(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setRolesError(err.message || 'Failed to fetch roles');
    } finally {
      setRolesLoading(false);
    }
  };

  const closeRoleModal = () => {
    setShowRoleModal(false);
    setSelectedRoleUserId(null);
    setSelectedRoleId('');
    setAssignRoleError(null);
    setAssignRoleSuccess(null);
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();
    if (!selectedRoleId) return;
    setAssignRoleLoading(true);
    setAssignRoleError(null);
    setAssignRoleSuccess(null);
    try {
      await fetchData(`roles/${selectedRoleId}/users`, 'POST', JSON.stringify({ users_id: [selectedRoleUserId] }));
      setAssignRoleSuccess('Role assigned successfully.');
      // Optionally refresh users list to reflect new role
      const data = await fetchData('user-managements', 'GET');
      setUsers(Array.isArray(data) ? data : data.data || []);
      setShowRoleModal(false);
    } catch (err) {
      setAssignRoleError(err.message || 'Failed to assign role');
    } finally {
      setAssignRoleLoading(false);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchData('user-managements', 'GET');
        setUsers(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch user managements');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Password update state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  const openPasswordModal = (userId) => {
    setSelectedUserId(userId);
    setNewPassword('');
    setPasswordError(null);
    setPasswordSuccess(null);
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setSelectedUserId(null);
    setNewPassword('');
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);
    try {
      await fetchData(`user-managements/${selectedUserId}/password`, 'PUT', JSON.stringify({ password: newPassword }));
      setPasswordSuccess('Password updated successfully.');
      setNewPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  // Toggle active state
  const [toggleLoadingId, setToggleLoadingId] = useState(null);
  const [toggleError, setToggleError] = useState(null);

  const handleToggleActive = async (userId) => {
    setToggleLoadingId(userId);
    setToggleError(null);
    try {
      await fetchData(`user-managements/${userId}/active-toggle`, 'PUT');
      setUsers(users => users.map(u => u.id === userId ? { ...u, is_active: !u.is_active } : u));
    } catch (err) {
      setToggleError(err.message || 'Failed to toggle active state');
    } finally {
      setToggleLoadingId(null);
    }
  };

  // Create user state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({ emp_number: '', email: '', password: '', name: '' });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);

  const handleCreateChange = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError(null);
    setCreateSuccess(null);
    try {
      const body = {
        emp_number: createForm.emp_number,
        email: createForm.email,
        password: createForm.password,
        name: createForm.name,
      };
      await fetchData('user-managements', 'POST', JSON.stringify(body));
      setCreateSuccess('User created successfully.');
      setCreateForm({ emp_number: '', email: '', password: '', name: '' });
      // Refresh users list
      const data = await fetchData('user-managements', 'GET');
      setUsers(Array.isArray(data) ? data : data.data || []);
      setShowCreateForm(false);
    } catch (err) {
      setCreateError(err.message || 'Failed to create user');
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Managements</h1>

      <button
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={() => setShowCreateForm((v) => !v)}
      >
        {showCreateForm ? 'Cancel' : 'Add New User'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateUser} className="mb-6 bg-white p-4 rounded shadow border border-gray-200 max-w-xl">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Employee Number</label>
            <input
              type="text"
              name="emp_number"
              value={createForm.emp_number}
              onChange={handleCreateChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={createForm.name}
              onChange={handleCreateChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={createForm.email}
              onChange={handleCreateChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={createForm.password}
              onChange={handleCreateChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {createError && <div className="text-red-600 text-sm mb-2">{createError}</div>}
          {createSuccess && <div className="text-green-600 text-sm mb-2">{createSuccess}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              disabled={createLoading}
            >
              {createLoading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      )}

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {toggleError && <div className="text-red-600 mb-4">{toggleError}</div>}
      {!loading && !error && (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Employee Number</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Active</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.id}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.emp_number}</td>
                    <td className="py-2 px-4 border-b">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((r, idx) => {
                          // Assign a color based on role name hash
                          const colors = [
                            'bg-blue-100 text-blue-800',
                            'bg-green-100 text-green-800',
                            'bg-yellow-100 text-yellow-800',
                            'bg-purple-100 text-purple-800',
                            'bg-pink-100 text-pink-800',
                            'bg-indigo-100 text-indigo-800',
                            'bg-red-100 text-red-800',
                            'bg-gray-100 text-gray-800',
                          ];
                          // Simple hash for color selection
                          let hash = 0;
                          for (let i = 0; i < r.name.length; i++) {
                            hash = r.name.charCodeAt(i) + ((hash << 5) - hash);
                          }
                          const colorClass = colors[Math.abs(hash) % colors.length];

                          // Remove role handler
      
                          const handleRemoveRole = async () => {
                            setRemoving(true);
                            setRemoveError(null);
                            try {
                              await fetchData(`roles/${r.id}/users`, 'DELETE', JSON.stringify({ users_id: [user.id] }));
                              // Refresh users list
                              const data = await fetchData('user-managements', 'GET');
                              setUsers(Array.isArray(data) ? data : data.data || []);
                            } catch (err) {
                              setRemoveError(err.message || 'Failed to remove role');
                            } finally {
                              setRemoving(false);
                            }
                          };

                          return (
                            <span
                              key={r.name + idx}
                              className={`inline-block px-2 py-1 mr-1 mb-1 rounded text-xs font-semibold ${colorClass} relative`}
                            >
                              {r.name}
                              <button
                                type="button"
                                className="ml-1 text-red-600 hover:text-red-900 font-bold focus:outline-none"
                                style={{ fontSize: '12px', lineHeight: '1' }}
                                title="Remove role"
                                onClick={handleRemoveRole}
                                disabled={removing}
                              >
                                ×
                              </button>
                              {removeError && (
                                <div className="absolute left-0 top-full text-xs text-red-600 bg-white border border-red-200 rounded px-2 py-1 mt-1 z-10">
                                  {removeError}
                                </div>
                              )}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">{user.is_active ? 'Yes' : 'No'}</td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded"
                        onClick={() => openPasswordModal(user.id)}
                      >
                        Update Password
                      </button>
                      <button
                        className={`text-xs px-3 py-1 rounded ${user.is_active ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-green-500 hover:bg-green-700 text-white'}`}
                        onClick={() => handleToggleActive(user.id)}
                        disabled={toggleLoadingId === user.id}
                      >
                        {toggleLoadingId === user.id ? 'Processing...' : user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white text-xs px-3 py-1 rounded"
                        onClick={() => openRoleModal(user.id)}
                      >
                        Add Role
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Add Role Modal */}
          {showRoleModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Assign Role to User</h2>
                {rolesLoading ? (
                  <div>Loading roles...</div>
                ) : rolesError ? (
                  <div className="text-red-600 text-sm mb-2">{rolesError}</div>
                ) : (
                  <form onSubmit={handleAssignRole}>
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                      value={selectedRoleId}
                      onChange={e => setSelectedRoleId(e.target.value)}
                      required
                    >
                      <option value="">Select a role</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    {assignRoleError && <div className="text-red-600 text-sm mb-2">{assignRoleError}</div>}
                    {assignRoleSuccess && <div className="text-green-600 text-sm mb-2">{assignRoleSuccess}</div>}
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={closeRoleModal}
                        disabled={assignRoleLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        disabled={assignRoleLoading || !selectedRoleId}
                      >
                        {assignRoleLoading ? 'Assigning...' : 'Assign Role'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Password Modal */}
          {showPasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Update Password</h2>
                <form onSubmit={handlePasswordUpdate}>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                    placeholder="New password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                  {passwordError && <div className="text-red-600 text-sm mb-2">{passwordError}</div>}
                  {passwordSuccess && <div className="text-green-600 text-sm mb-2">{passwordSuccess}</div>}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={closePasswordModal}
                      disabled={passwordLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      disabled={passwordLoading || !newPassword}
                    >
                      {passwordLoading ? 'Updating...' : 'Update'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserManagementsPage;
