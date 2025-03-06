'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { Switch } from "../switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';
import { Button } from "../button";

interface UserFormProps {
  user: User;
}

export function UserForm({ user }: UserFormProps) {
  const [formData, setFormData] = useState(user);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  // Handle changes for top-level fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [name]: [value],
      },

      // [name]: [value],
    }));
  };

  // Handle changes for nested attributes
  const handleAttributesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
     attributes: {
        ...prev.attributes,
        [name]: [value],
      }, 
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var path = "";
    var methodPath = "";
    var nextCheck = false;
    // const response = await fetch('../api/user/update', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // });

    if (formData.attributes.next == undefined) {
      nextCheck = false;
    } else {
      nextCheck = true;
    }

    if (nextCheck === true) {
      path = process.env.UPDATE_USER_NEXT || "../api/user/update";
      methodPath = 'PUT';
    } else {
      path = '../api/user/update';
      methodPath = 'POST';
    }
    const response = await fetch(`${path}`, {
      method: methodPath,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditMode(false);
    }

    if (response.ok == false) {
      Swal.fire({
        icon: "error",
        title: "แก้ไขไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditMode(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    router.push('/users');
  };

  // Grouped fields based on the converted map
  const groupedFields = {
    personalInfo: {
      username: formData.username || '',
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      emailVerified: formData.emailVerified || false,
      DateOfBirth: formData.attributes?.DateOfBirth?.[0] || '',
      // Gender: formData.attributes?.Gender?.[0] || '',
      Nationality: formData.attributes?.Nationality?.[0] || '',
      NationalIDCard: formData.attributes?.NationalIDCard?.[0] || '',
      NationalIDCard_Expired: formData.attributes?.NationalIDCard_Expired?.[0] || '',
    },
    addressInfo: {
      // addr_Address: formData.attributes?.addr_Address?.[0] || '',
      No: formData.attributes?.No?.[0] || '',
      Floor: formData.attributes?.Floor?.[0] || '',
      addr_SubDistrict: formData.attributes?.addr_SubDistrict?.[0] || '',
      addr_District: formData.attributes?.addr_District?.[0] || '',
      addr_Province: formData.attributes?.addr_Province?.[0] || '',
      addr_PostCode: formData.attributes?.addr_PostCode?.[0] || '',
      addr_Moo: formData.attributes?.addr_Moo?.[0] || '',
      Residence: formData.attributes?.Residence?.[0] || '',
      addr_Road: formData.attributes?.addr_Road?.[0] || '',
      addr_Soi: formData.attributes?.addr_Soi?.[0] || '',
    },
    bankInfo: {
      nextCollateral: {
        BankName_Next_Collateral: formData.attributes?.BankName_Next_Collateral?.[0] || '',
        // BankCode_Next_Collateral: formData.attributes?.BankCode_Next_Collateral?.[0] || '',
        BankAccount_Next_Collateral: formData.attributes?.BankAccount_Next_Collateral?.[0] || '',
        // BankCardholderName_Next_Collateral: formData.attributes?.BankCardholderName_Next_Collateral?.[0] || '',
      },
      nextCash_Balance: {
        BankName_Next_CashBalance: formData.attributes?.BankName_Next_CashBalance?.[0] || '',
        // BankCode_Next_CashBalance: formData.attributes?.BankCode_Next_CashBalance?.[0] || '',
        BankAccount_Next_CashBalance: formData.attributes?.BankAccount_Next_CashBalance?.[0] || '',
        // BankCardholderName_Next_CashBalance: formData.attributes?.BankCardholderName_Next_CashBalance?.[0] || '',
      },
      plusCash_Balance: {
        BankName_Plus_CashBalance: formData.attributes?.BankName_Plus_CashBalance?.[0] || '',
        // BankCode_Plus_CashBalance: formData.attributes?.BankCode_Plus_CashBalance?.[0] || '',
        BankAccount_Plus_CashBalance: formData.attributes?.BankAccount_Plus_CashBalance?.[0] || '',
        // BankCardholderName_Plus_CashBalance: formData.attributes?.BankCardholderName_Plus_CashBalance?.[0] || '',
      }
    },
    contactInfo: {
      Telephone: formData.attributes?.Telephone?.[0] || '',
      // lastAddress: formData.attributes?.lastAddress?.[0] || '',
    },
    verificationInfo: {
      CDD: formData.attributes?.CDD?.[0] || '',
      'E-KYC': formData.attributes?.['E-KYC']?.[0] || '',
    },
    systemInfo: {
      id: formData.id || '',
      createdTimestamp: formData.createdTimestamp || 0,
      enabled: formData.enabled || false,
      // totp: formData.totp,
      // disableableCredentialTypes: formData.disableableCredentialTypes,
      // requiredActions: formData.requiredActions,
      // notBefore: formData.notBefore,
      // access: formData.access,
    },
    platform: {
      next: formData.attributes?.next?.[0] || '',
      plus: formData.attributes?.plus?.[0] || '',
    },
  };

  return (
    <div>
      <div className="py-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="edit-mode-switch" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {isEditMode ? 'View Mode' : 'Edit Mode'}
          </label>
          <Switch id="edit-mode-switch" checked={isEditMode} onCheckedChange={setIsEditMode} />
        </div>
      </div>
      <div className="p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">Personal Information</h2>
            {Object.entries(groupedFields.personalInfo).map(([key, value]) => {
              if (key === 'emailVerified') {
                return (
                  <div className="grid gap-2" key={key}>
                    <Label htmlFor={key}>Email Verified</Label>
                    <Select
                      disabled={!isEditMode}
                      value={formData[key as keyof User]?.toString() || ''}
                      onValueChange={(value) => setFormData({ ...formData, [key]: value === 'true' })}
                      defaultValue={formData[key as keyof User]?.toString() || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent id={key}>
                        <SelectGroup>
                          <SelectItem value="true">Verified</SelectItem>
                          <SelectItem value="false">Unverified</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }
              // if (key === 'DateOfBirth') {
              //   return (
              //     <div className="grid gap-2" key={key}>
              //       <Label htmlFor={key}>วันเกิด</Label>
              //       {formData[key as keyof User]?.toString()}
              //       <Input
              //         id={key}
              //         name={key}
              //         type="text"
              //         placeholder={key}
              //         value={new Date(Number(formData[key as keyof User]?.toString() || 0)).toLocaleString() || ''}
              //         onChange={handleChange}
              //         disabled={!isEditMode}
              //         className="w-full"
              //       />
              //     </div>
              //   );
              // }
              return (
                <div className="grid gap-2" key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    id={key}
                    name={key}
                    type="text"
                    placeholder={key}
                    value={
                      formData.attributes?.[key]?.[0] || 
                      formData[key as keyof User]?.toString() || ''
                    }
                    onChange={(e) => {
                      // if (formData.attributes?.[key]) {
                      //   handleAttributesChange(e);
                      // } else {
                      //   handleChange(e);
                      // }
                        handleAttributesChange(e);
                    }}
                    disabled={
                      !isEditMode ||
                      key === 'username' ||
                      key === 'email'
                    }
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>

          {/* Address Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">Address Information</h2>
            {Object.entries(groupedFields.addressInfo).map(([key, value]) => (
              <div className="grid gap-2" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  name={key}
                  type="text"
                  placeholder={key}
                  value={value || ''}
                  onChange={handleAttributesChange}
                  disabled={!isEditMode}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Bank Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">AusirisNext Bank Information</h2>
            {Object.entries(groupedFields.bankInfo.nextCollateral).map(([key, value]) => (
              <div className="grid gap-2" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  name={key}
                  type="text"
                  placeholder={key}
                  value={value || ''}
                  onChange={handleAttributesChange}
                  disabled={!isEditMode}
                  className="w-full"
                />
              </div>
            ))}
            {Object.entries(groupedFields.bankInfo.nextCash_Balance).map(([key, value]) => (
              <div className="grid gap-2" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  name={key}
                  type="text"
                  placeholder={key}
                  value={value || ''}
                  onChange={handleAttributesChange}
                  disabled={!isEditMode || key === 'BankName_Next_CashBalance' || key === 'BankAccount_Next_CashBalance'}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">AusirisPlus Bank Information</h2>
            {Object.entries(groupedFields.bankInfo.plusCash_Balance).map(([key, value]) => (
              <div className="grid gap-2" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  name={key}
                  type="text"
                  placeholder={key}
                  value={value || ''}
                  onChange={handleAttributesChange}
                  // disabled={!isEditMode}
                  disabled={true}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">Contact Information</h2>
            {Object.entries(groupedFields.contactInfo).map(([key, value]) => (
              <div className="grid gap-2" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  name={key}
                  type="text"
                  placeholder={key}
                  value={value || ''}
                  onChange={handleAttributesChange}
                  disabled={!isEditMode}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Verification Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">Verification Information</h2>
            {Object.entries(groupedFields.verificationInfo).map(([key]) => {
              const attributeValue = formData.attributes?.[key]?.[0] || '';

              // Skip rendering if the attribute value is undefined or empty
              if (attributeValue === undefined) {
                return null;
              }

              return (
                <div className="grid gap-2" key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <Select
                    disabled={!isEditMode}
                    value={attributeValue}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        attributes: {
                          ...prev.attributes || {},
                          [key]: [value],
                        },
                      }))
                    }
                    defaultValue={attributeValue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent id={key}>
                      <SelectGroup>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>

          {/* Platform */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">Platform</h2>
            {Object.entries(groupedFields.platform).map(([key]) => {
              const attributeValue = formData.attributes?.[key]?.[0] || '';

              // Skip rendering if the attribute value is undefined or empty
              if (attributeValue === undefined) {
                return null;
              }

              return (
                <div className="grid gap-2" key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <Select
                    // disabled={!isEditMode}
                    disabled={true}
                    value={attributeValue}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        attributes: {
                          ...prev.attributes || {},
                          [key]: [value],
                        },
                      }))
                    }
                    defaultValue={attributeValue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent id={key}>
                      <SelectGroup>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>

          {/* System Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <h2 className="col-span-full text-lg font-semibold">System Information</h2>
            {Object.entries(groupedFields.systemInfo).map(([key, value]) => {
              if (key === 'enabled') {
                return (
                  <div className="grid gap-2" key={key}>
                    <Label htmlFor={key}>Active User</Label>
                    <Select
                      disabled={!isEditMode}
                      value={formData[key as keyof User]?.toString() || ''}
                      onValueChange={(value) => setFormData({ ...formData, [key]: value === "true" })}
                      defaultValue={formData[key as keyof User]?.toString() || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent id={key}>
                        <SelectGroup>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Blacklist</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                );
              }
              if (key === 'createdTimestamp') {
                return (
                  <div className="grid gap-2" key={key}>
                    <Label htmlFor={key}>วันเวลาที่สร้างบัญชี</Label>
                    <Input
                      id={key}
                      name={key}
                      type="text"
                      placeholder={key}
                      value={new Date(Number(formData[key as keyof User]?.toString() || 0)).toLocaleString() || ''}
                      onChange={handleChange}
                      disabled={!isEditMode || key === 'createdTimestamp'}
                      className="w-full"
                    />
                  </div>
                );
              }
              return (
                <div className="grid gap-2" key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    id={key}
                    name={key}
                    type="text"
                    placeholder={key}
                    value={
                      // Check if the field is nested in `attributes`
                      formData.attributes?.[key]?.[0] || // For nested attributes
                      formData[key as keyof User]?.toString() || '' // For top-level fields
                    }
                    onChange={(e) => {
                      if (formData.attributes?.[key]) {
                        // Handle nested attributes
                        handleAttributesChange(e);
                      } else {
                        // Handle top-level fields
                        handleChange(e);
                      }
                    }}
                    disabled={
                      !isEditMode ||
                      key === 'id'
                    }
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <Button type="button" variant="outline" className="bg-white text-sky-900 border border-sky-900" onClick={handleBack}>
              Back
            </Button>
            {isEditMode && (
              <Button type="submit" className="bg-sky-900 hover:bg-sky-800 dark:text-white">
                Save
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}