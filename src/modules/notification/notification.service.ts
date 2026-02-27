import { prisma } from "../../config/db.config";
import { sendEmail } from "../../common/util/email.util"

export class NotificationService {
  constructor(private prismaService = prisma) {}

  // ✔ Create + send email
  async sendNotification(userId: string, message: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    // Save notification
    const notification = await this.prismaService.notification.create({
      data: {
        userId,
        title: "New Notification", 
        message,
      },
    });

    // Send email
    await sendEmail(user.email, "New Notification from ASTU System", message);

    return notification;
  }

  // ✔ Get notifications of logged-in user
  async getMyNotifications(userId: string) {
    return this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  // ✔ Mark notification as read
  async markAsRead(id: string, userId: string) {
    const exists = await this.prismaService.notification.findUnique({
      where: { id },
    });
    if (!exists) throw new Error("Notification not found");

    if (exists.userId !== userId) throw new Error("Unauthorized");

    return this.prismaService.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
