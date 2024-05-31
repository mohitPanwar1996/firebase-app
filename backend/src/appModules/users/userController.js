import { getDatabase } from "../../database/index.js";

const timestamp = new Date().toISOString().slice(0, 23).replace("T", " ");

export const getPermissions = async (req, res) => {
  try {
    const getPermissions = await getDatabase()
      .select("*")
      .from("core.c_permissions");
    res
      .status(200)
      .send({ message: "List of permissions!", data: getPermissions });
  } catch (e) {
    console.error("Error creating permission!", e);
    res.status(500).send({
      message: "Error creating permission!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { permission_name, module, user } = req.body;
    const createPermission = await getDatabase()
      .insert({
        permission_name: permission_name,
        module: module,
        created_by: user,
        created_at: timestamp,
      })
      .into("core.c_permissions");
    res
      .status(200)
      .send({ message: "Permission created!", data: createPermission });
  } catch (e) {
    console.error("Error creating permission!", e);
    res.status(500).send({
      message: "Error creating permission!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};

export const getRoles = async (req, res) => {
  try {
    const getRoles = await getDatabase()
      .select("id", "name", "permissions")
      .from("core.ac_roles");
    res.status(200).send({ message: "List of roles", data: getRoles });
  } catch (e) {
    console.error("Error getting role!", e);
    res.status(500).send({
      message: "Error getting role!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, description, created_by, permissions } = req.body;
    const createRole = await getDatabase()
      .insert({
        name: name,
        description: description,
        created_by: created_by,
        permissions: permissions,
        created_at: timestamp,
      })
      .into("core.ac_roles");
    res.status(200).send({ message: "New role created", data: createRole });
  } catch (e) {
    console.error("Error on creating a new role!", e);
    res.status(500).send({
      message: "Error on creating a new role!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const getUsers = await getDatabase().select("*").from("core.c_users");
    res.status(200).send({ message: "List of users", data: getUsers });
  } catch (e) {
    console.error("Error getting users!", e);
    res.status(500).send({
      message: "Error getting users!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email_id, role, role_id } = req.body;
    const createUser = await getDatabase()
      .insert({ name: name, email_id: email_id, role: role, role_id })
      .into("core.c_users");
    res.status(200).send({ message: "New user created", data: createUser });
  } catch (e) {
    console.error("Error creating users data!", e);
    res.status(500).send({
      message: "Error creating users data!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { user_email } = req.body;
    // Fetch the user role and role ID
    const [userRole] = await getDatabase()
      .select("role", "role_id")
      .from("core.c_users")
      .where("email_id", user_email);

    if (!userRole) {
      return res.status(404).json({ message: "User not found" });
    }

    const { role, role_id: roleId } = userRole;

    // Fetch the role permissions
    const [rolePermission] = await getDatabase()
      .select("permissions")
      .from("core.ac_roles")
      .where({ name: role, id: roleId });

    if (!rolePermission) {
      return res.status(404).json({ message: "Role permissions not found" });
    }
    res.status(200).send({
      message: "User details",
      data: user_email,
      role,
      roleId,
      permissions: rolePermission.permissions,
    });
  } catch (e) {
    console.error("Error fetching user details!", e);
    res.status(500).send({
      message: "Error fetching user details!",
      error: e?.message,
      errorStack: e?.stack,
    });
  }
};
