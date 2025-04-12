import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfileForm({ user, profiles, setProfiles }) {
  const [formData, setFormData] = useState({
    fullName: profiles[user.uid]?.fullName || "",
    companyName: profiles[user.uid]?.companyName || "",
    companyDescription: profiles[user.uid]?.companyDescription || "",
    phone: profiles[user.uid]?.phone || "",
    email: profiles[user.uid]?.email || "",
    website: profiles[user.uid]?.website || "",
    description: profiles[user.uid]?.description || "",
    photo: profiles[user.uid]?.photo || null,
  });
  const [profileLink, setProfileLink] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileId = user.uid; // Use user UID as the profile ID
    setProfiles({ ...profiles, [profileId]: { ...formData, id: profileId } });
    const shortLink = `/profile/${profileId}`;
    setProfileLink(shortLink);
    navigate(shortLink);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Create/Edit Your Profile
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 bg-gray-800 rounded"
          required
        />
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full p-3 bg-gray-800 rounded"
          required
        />
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          placeholder="What does your company do?"
          className="w-full p-3 bg-gray-800 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 bg-gray-800 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded"
          required
        />
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Company Website"
          className="w-full p-3 bg-gray-800 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 bg-gray-800 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 bg-gray-800 rounded"
        />
        <motion.button
          type="submit"
          className="bg-orange-500 text-white px-6 py-3 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Save Profile
        </motion.button>
      </form>
      {profileLink && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a href={profileLink} className="text-orange-500">
            View Your Profile: {profileLink}
          </a>
        </motion.div>
      )}
    </div>
  );
}

export default ProfileForm;