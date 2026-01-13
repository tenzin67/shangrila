import AccountLayout from '@/Layouts/AccountLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Addresses({ auth, addresses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        label: '',
        address: '',
        city: '',
        zip: '',
        is_default: false,
    });

    const openModal = (address = null) => {
        setEditingAddress(address);
        if (address) {
            setData({
                label: address.label,
                address: address.address,
                city: address.city,
                zip: address.zip,
                is_default: address.is_default
            });
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAddress(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingAddress) {
            put(route('addresses.update', editingAddress.id), {
                onSuccess: closeModal,
            });
        } else {
            post(route('addresses.store'), {
                onSuccess: closeModal,
            });
        }
    };

    const deleteAddress = (id) => {
        if (confirm('Are you sure you want to delete this address?')) {
            destroy(route('addresses.destroy', id));
        }
    };

    return (
        <AccountLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Address Book</h2>
                    <PrimaryButton onClick={() => openModal()}>Add New Address</PrimaryButton>
                </div>
            }
        >
            <Head title="Address Book" />

            {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <div key={address.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${address.is_default ? 'border-primary ring-1 ring-primary' : 'border-gray-100'} relative group`}>
                            {address.is_default && (
                                <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                    Default
                                </span>
                            )}
                            <h3 className="font-bold text-gray-900 mb-1">{address.label}</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {address.address}<br />
                                {address.city}, {address.zip}
                            </p>
                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => openModal(address)}
                                    className="text-sm font-bold text-gray-600 hover:text-gray-900"
                                >
                                    Edit
                                </button>
                                {!address.is_default && (
                                    <button
                                        onClick={() => deleteAddress(address.id)}
                                        className="text-sm font-bold text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <div className="mb-4 text-gray-300">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No addresses saved</h3>
                    <p className="text-gray-500 mt-2 mb-6">Add an address for faster checkout.</p>
                </div>
            )}

            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="label" value="Label (e.g. Home, Work)" />
                            <TextInput
                                id="label"
                                className="mt-1 block w-full"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                placeholder="Home"
                            />
                            <InputError message={errors.label} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                required
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="city" value="City" />
                                <TextInput
                                    id="city"
                                    className="mt-1 block w-full"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    required
                                />
                                <InputError message={errors.city} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="zip" value="ZIP Code" />
                                <TextInput
                                    id="zip"
                                    className="mt-1 block w-full"
                                    value={data.zip}
                                    onChange={(e) => setData('zip', e.target.value)}
                                    required
                                />
                                <InputError message={errors.zip} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_default"
                                checked={data.is_default}
                                onChange={(e) => setData('is_default', e.target.checked)}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="is_default" className="ml-2 text-sm text-gray-600">
                                Set as default shipping address
                            </label>
                        </div>

                        <div className="flex justify-end gap-4">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <PrimaryButton disabled={processing}>Save Address</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AccountLayout>
    );
}
