import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Typography, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { stringAvatar } from "@utils/stringAvatar";
import { useUser } from "@contexts/UserProvider";

const FileInput = ({ field, control }) => {
  const { user } = useUser();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (user.avatar) {
      setFilePreview(user.avatar);
    }
  }, [user]);

  const handleRemoveFile = (onChange: (value: any) => void) => {
    setFilePreview(null);
    onChange(null);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFilePreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file); // Convert file to Base64
    } else {
      setFilePreview(null);
      onChange(null);
    }
  };

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={user.avatar || ""}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel sx={{ top: "-40%" }}>{field.label}</InputLabel>
          <div>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, onChange)}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <IconButton component="span" sx={{ width: 80, height: 80 }}>
                {filePreview ? (
                  <Avatar
                    alt="File preview"
                    src={filePreview}
                    sx={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(`${user.name} ${user.surname}`)}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </IconButton>
            </label>
            {filePreview && (
              <IconButton onClick={() => handleRemoveFile(onChange)} sx={{ mt: 1 }}>
                <DeleteIcon />
              </IconButton>
            )}
            {error && (
              <Typography sx={{ padding: 0, margin: 0 }} variant="caption" color="error">
                {error.message}
              </Typography>
            )}
          </div>
        </FormControl>
      )}
    />
  );
};

export default FileInput;
