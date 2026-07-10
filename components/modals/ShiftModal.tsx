"use client";
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import { SVGLoader } from "../../components/SVGLoader";
import {
  useGetShiftsByOfficeQuery,
  useAddShiftMutation,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
  useAssignUserToShiftMutation,
} from "@/utils/APISlice/officeLocationApi";
import { useGetUsersParamsQuery } from "@/utils/APISlice/userApi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface ShiftModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  officeId: string;
}

const ShiftModal = ({ isOpen, setIsOpen, officeId }: ShiftModalProps) => {
  const {
    data: shiftsData,
    isLoading: shiftsLoading,
    refetch: refetchShifts,
  } = useGetShiftsByOfficeQuery(officeId, { skip: !isOpen });
  const { data: usersData, isLoading: usersLoading } = useGetUsersParamsQuery(
    { officeId },
    { skip: !isOpen }
  );
  const [addShift, { isLoading: addShiftLoading }] = useAddShiftMutation();
  const [updateShift, { isLoading: updateShiftLoading }] =
    useUpdateShiftMutation();
  const [deleteShift, { isLoading: deleteShiftLoading }] =
    useDeleteShiftMutation();
  const [assignUserToShift, { isLoading: assignLoading }] =
    useAssignUserToShiftMutation();

  const [shifts, setShifts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [newShift, setNewShift] = useState({
    name: "",
    startTime: "",
    endTime: "",
  });
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);
  const [editingShiftData, setEditingShiftData] = useState({
    name: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    // Check if shiftsData or shiftsData.data is an array
    const extractedShifts = Array.isArray(shiftsData)
      ? shiftsData
      : Array.isArray(shiftsData?.data)
        ? shiftsData.data
        : [];
    setShifts(extractedShifts);

    if (usersData?.data?.data) {
      setUsers(usersData.data.data);
    }
  }, [shiftsData, usersData]);

  useEffect(() => {
    if (!isOpen) {
      setNewShift({ name: "", startTime: "", endTime: "" });
      setEditingShiftId(null);
      setEditingShiftData({ name: "", startTime: "", endTime: "" });
    }
  }, [isOpen]);

  const handleAddShift = async () => {
    try {
      await addShift({ ...newShift, officeId }).unwrap();
      setNewShift({ name: "", startTime: "", endTime: "" });
      toast.success("Shift added successfully!");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to add shift"));
    }
  };

  const handleUpdateShift = async () => {
    if (!editingShiftId) return;
    try {
      await updateShift({ id: editingShiftId, ...editingShiftData }).unwrap();
      setEditingShiftId(null);
      setEditingShiftData({ name: "", startTime: "", endTime: "" });
      toast.success("Shift updated successfully!");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to update shift"));
    }
  };

  const handleDeleteShift = async (shiftId: string) => {
    try {
      await deleteShift(shiftId).unwrap();
      toast.success("Shift deleted successfully!");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to delete shift"));
    }
  };

  const handleAssignUser = async (userId: string, shiftId: string) => {
    try {
      await assignUserToShift({ userId, shiftId }).unwrap();
      toast.success("User assigned to shift successfully!");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to assign user"));
    }
  };

  return (
    <div className="z-50 h-full">
      {isOpen && (
        <>
          <div
            className="fixed !inset-0 bg-[#00000051] !bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white w-[900px] max-w-[95vw] max-h-[90vh] rounded-[5px] flex flex-col shadow-xl relative">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 bg-white rounded-t-[32px]">
                <h3 className="text-lg font-semibold">Manage Shifts</h3>
                <button
                  className="text-gray-500 hover:text-gray-800 rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                {/* Add New Shift */}
                <div className="border border-gray-200 rounded p-4">
                  <h4 className="font-medium mb-4">Add New Shift</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="text"
                      value={newShift.name}
                      handleOnChange={(e) =>
                        setNewShift({ ...newShift, name: e.target.value })
                      }
                      label="Shift Name"
                      placeholder="e.g. Morning Shift"
                    />
                    <Input
                      type="time"
                      value={newShift.startTime}
                      handleOnChange={(e) =>
                        setNewShift({ ...newShift, startTime: e.target.value })
                      }
                      label="Start Time"
                    />
                    <Input
                      type="time"
                      value={newShift.endTime}
                      handleOnChange={(e) =>
                        setNewShift({ ...newShift, endTime: e.target.value })
                      }
                      label="End Time"
                    />
                  </div>
                  <button
                    className="btn_model_active mt-4 rounded-none"
                    onClick={handleAddShift}
                    disabled={addShiftLoading}
                  >
                    {addShiftLoading ? (
                      <SVGLoader width="20px" height="20px" color="#FFF" />
                    ) : (
                      "Add Shift"
                    )}
                  </button>
                </div>

                {/* Shifts List */}
                <div>
                  <h4 className="font-medium mb-4">Existing Shifts</h4>
                  {shiftsLoading ? (
                    <div className="flex justify-center">
                      <SVGLoader width="30px" height="30px" />
                    </div>
                  ) : shifts.length === 0 ? (
                    <p className="text-gray-500 text-center w-full">No shifts found</p>
                  ) : (
                    <div className="space-y-4">
                      {shifts.map((shift) => (
                        <div
                          key={shift.id}
                          className="border border-gray-200 rounded p-4"
                        >
                          {editingShiftId === shift.id ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <Input
                                  type="text"
                                  value={editingShiftData.name}
                                  handleOnChange={(e) =>
                                    setEditingShiftData({
                                      ...editingShiftData,
                                      name: e.target.value,
                                    })
                                  }
                                  label="Shift Name"
                                />
                                <Input
                                  type="time"
                                  value={editingShiftData.startTime}
                                  handleOnChange={(e) =>
                                    setEditingShiftData({
                                      ...editingShiftData,
                                      startTime: e.target.value,
                                    })
                                  }
                                  label="Start Time"
                                />
                                <Input
                                  type="time"
                                  value={editingShiftData.endTime}
                                  handleOnChange={(e) =>
                                    setEditingShiftData({
                                      ...editingShiftData,
                                      endTime: e.target.value,
                                    })
                                  }
                                  label="End Time"
                                />
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className="btn_model_active rounded-none"
                                  onClick={handleUpdateShift}
                                  disabled={updateShiftLoading}
                                >
                                  {updateShiftLoading ? (
                                    <SVGLoader
                                      width="20px"
                                      height="20px"
                                      color="#FFF"
                                    />
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                                <button
                                  className="btn_model_outline rounded-none"
                                  onClick={() => {
                                    setEditingShiftId(null);
                                    setEditingShiftData({
                                      name: "",
                                      startTime: "",
                                      endTime: "",
                                    });
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium">{shift.name}</h5>
                                  <p className="text-sm text-gray-500">
                                    {shift.startTime} - {shift.endTime}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                    onClick={() => {
                                      setEditingShiftId(shift.id);
                                      setEditingShiftData({
                                        name: shift.name,
                                        startTime: shift.startTime,
                                        endTime: shift.endTime,
                                      });
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-800 text-sm"
                                    onClick={() => handleDeleteShift(shift.id)}
                                    disabled={deleteShiftLoading}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>

                              {/* Assign Users */}
                              <div className="mt-4">
                                <h6 className="text-sm font-medium mb-2">
                                  Assign Users:
                                </h6>
                                {usersLoading ? (
                                  <div className="flex justify-center">
                                    <SVGLoader width="20px" height="20px" />
                                  </div>
                                ) : users.length === 0 ? (
                                  <p className="text-sm text-gray-500">
                                    No users found for this office
                                  </p>
                                ) : (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {users.map((user) => (
                                      <div
                                        key={user.id}
                                        className={`flex items-center justify-between p-2 border rounded ${user.shiftId === shift.id
                                          ? "border-blue-500 bg-blue-50"
                                          : "border-gray-200"
                                          }`}
                                      >
                                        <span className="text-sm">
                                          {user.name}
                                        </span>
                                        {user.shiftId === shift.id ? (
                                          <span className="text-xs text-green-600">
                                            Assigned
                                          </span>
                                        ) : (
                                          <button
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                            onClick={() =>
                                              handleAssignUser(user.id, shift.id)
                                            }
                                            disabled={assignLoading}
                                          >
                                            Assign
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end bg-white rounded-b-[32px]">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn_model_outline rounded-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShiftModal;
