import { User } from "../../models/user.model.js";

const getAllUserService = async (
  authorId,
  page = 1,
  limit = 5,
  searchQuery = ""
) => {
  try {
    // Fetch user to check their role
    const user = await User.findById(authorId);
    if (!user) {
      return {
        message: "User not found",
        data: [],
      };
    }

    const skip = (page - 1) * limit;

    const matchStage = searchQuery
      ? {
          $or: [
            { fullName: new RegExp(searchQuery, "i") },
            { email: new RegExp(searchQuery, "i") },
          ],
        }
      : {};

    const allUser = await User.aggregate([
      { $match: matchStage },
      { $project: { fullName: 1, email: 1, role: 1, plan: 1 } },
      { $skip: skip },
      { $limit: limit },
      { $sort: { fullName: 1 } },
    ]);

    const totalUsers = await User.countDocuments(matchStage);

    if (user?.role === "manager") {
      return {
        message: "User data fetched successfully",
        data: {
          allUser,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
        },
      };
    }

    // If the user is not a manager
    return {
      message: "User not authorized to fetch data",
      data: [],
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      message: "An error occurred while fetching users",
      data: [],
    };
  }
};

export { getAllUserService };
