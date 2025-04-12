import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ProfileView({ profiles, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = profiles[id];

  if (!profile) {
    return <div className="min-h-screen bg-black text-white p-8">Profile not found.</div>;
  }

  const handleEdit = () => {
    navigate("/profile");
  };

  const handleAddToContacts = () => {
    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
ORG:${profile.companyName}
TEL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
NOTE:${profile.description}
END:VCARD
    `.trim();

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.fullName}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {profile.photo && (
          <img
            src={profile.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        )}
        <h1 className="text-3xl font-bold">{profile.fullName}</h1>
        <p className="text-lg">{profile.companyName}</p>
        <p>{profile.companyDescription}</p>
        <p>Phone: {profile.phone}</p>
        <p>Email: {profile.email}</p>
        {profile.website && (
          <p>
            Website: <a href={profile.website} className="text-orange-500">{profile.website}</a>
          </p>
        )}
        {profile.description && <p>Description: {profile.description}</p>}
        <motion.button
          onClick={handleAddToContacts}
          className="bg-orange-500 text-white px-6 py-3 rounded-full mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add to Contacts
        </motion.button>
        {user && user.uid === id && (
          <motion.button
            onClick={handleEdit}
            className="bg-gray-500 text-white px-6 py-3 rounded-full mt-4 ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Edit Profile
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default ProfileView;