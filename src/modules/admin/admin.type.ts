export interface AssignComplaintDTO {
  complaintId: string;
  staffId: string;
}

export interface UpdateStatusDTO {
  complaintId: string;
  status: "open" | "in_progress" | "resolved" | "rejected" | "closed_by_admin";
}

export interface DeleteComplaintDTO {
  complaintId: string;
}