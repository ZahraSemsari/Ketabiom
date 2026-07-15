import React, { useEffect, useState } from "react";
import axios from "axios";
import Libraries from "./Libraries";
import Notes from "./Notes";
import Excerpts from "./Excerpts";
import Profile from "./Profile";
import defaultAvatar from "../../assets/default-avatar.png";
import { useAuth } from "./AuthContext";

type BookList = {
  id: number;
  title: string;
  author_name?: string;
  publisher_name?: string;
  cover_url?: string | null;
  pages_count?: number;
  published_year?: number | null;
  average_rating?: number;
  reviews_count?: number;
};

type ReadingListItem = {
  id: number;
  book: BookList;
  created_at?: string;
};

export type ReadingList = {
  id: number;
  name: string;
  list_type?: string;
  books_count?: string | number;
  items?: ReadingListItem[];
  created_at?: string;
};

export type UserNote = {
  id: number;
  username?: string;
  book?: number | null;
  book_title?: string;
  author_name?: string;
  cover_url?: string | null;
  text: string;
  created_at?: string;
};

export type UserQuote = {
  id: number;
  username?: string;
  book?: number | null;
  book_title?: string;
  author_name?: string;
  cover_url?: string | null;
  text: string;
  page_number?: number | null;
  created_at?: string;
};

type UserAccount = {
  id?: number;
  username?: string;
  email?: string;
  profile_image?: string | null;
  profile_image_url?: string | null;
  avatar?: string | null;
};

type ProfileResponse = Record<string, any>;

export default function UserProfile() {
  const { updateUsername: updateAuthUsername } = useAuth();

  const rawBaseUrl =
    import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
  const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");
  const apiBaseUrl = `${baseUrl}/api`;

  const [user, setUser] = useState<UserAccount | null>(null);
  const [profileData, setProfileData] = useState<ProfileResponse>({});
  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [quotes, setQuotes] = useState<UserQuote[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
  const [deletingQuoteId, setDeletingQuoteId] = useState<number | null>(null);

  const normalizeProfileImageUrl = (imageUrl?: string | null) => {
    if (!imageUrl) return null;

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://") ||
      imageUrl.startsWith("data:") ||
      imageUrl.startsWith("blob:")
    ) {
      return imageUrl;
    }

    if (imageUrl.startsWith("/")) {
      return `${baseUrl}${imageUrl}`;
    }

    return imageUrl;
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const getAuthConfig = (token?: string) => {
    const accessToken = token || getAccessToken();

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  const clearAuthAndGoLogin = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  const isAccessTokenExpired = (token: string | null) => {
    if (!token) return true;

    try {
      const payloadBase64 = token.split(".")[1];

      if (!payloadBase64) return true;

      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      const paddedBase64 = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "="
      );

      const payloadJson = atob(paddedBase64);
      const payload = JSON.parse(payloadJson);

      if (!payload.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp <= currentTime + 30;
    } catch {
      return true;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthAndGoLogin();
      throw new Error("No refresh token found");
    }

    try {
      const res = await axios.post(`${apiBaseUrl}/accounts/token/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = res.data.access;

      if (!newAccessToken) {
        clearAuthAndGoLogin();
        throw new Error("No access token returned from refresh endpoint");
      }

      localStorage.setItem("accessToken", newAccessToken);

      return newAccessToken;
    } catch (err) {
      clearAuthAndGoLogin();
      throw err;
    }
  };

  const getValidAccessToken = async () => {
    const accessToken = getAccessToken();

    if (!isAccessTokenExpired(accessToken)) {
      return accessToken;
    }

    return await refreshAccessToken();
  };

  const isTokenExpiredError = (err: any) => {
    const data = err?.response?.data;
    const stringifiedData = JSON.stringify(data || {});

    return (
      err?.response?.status === 401 &&
      (data?.code === "token_not_valid" ||
        stringifiedData.includes("Token is expired") ||
        stringifiedData.includes("token_not_valid"))
    );
  };

  const authGet = async (url: string) => {
    try {
      const validToken = await getValidAccessToken();

      return await axios.get(url, getAuthConfig(validToken || undefined));
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();

      return await axios.get(url, getAuthConfig(newAccessToken));
    }
  };

  const authPost = async (url: string, body: any) => {
    try {
      const validToken = await getValidAccessToken();

      return await axios.post(
        url,
        body,
        getAuthConfig(validToken || undefined)
      );
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();

      return await axios.post(url, body, getAuthConfig(newAccessToken));
    }
  };

  const authDelete = async (url: string) => {
    try {
      const validToken = await getValidAccessToken();

      return await axios.delete(url, getAuthConfig(validToken || undefined));
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();

      return await axios.delete(url, getAuthConfig(newAccessToken));
    }
  };

  const authPatch = async (url: string, body: any) => {
    try {
      const validToken = await getValidAccessToken();

      return await axios.patch(
        url,
        body,
        getAuthConfig(validToken || undefined)
      );
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();

      return await axios.patch(url, body, getAuthConfig(newAccessToken));
    }
  };

  const translateApiMessage = (message: string) => {
    const normalizedMessage = message.toLowerCase().trim();

    if (
      normalizedMessage.includes("a user with that username already exists") ||
      normalizedMessage.includes("user with that username already exists") ||
      normalizedMessage.includes("user with this username already exists") ||
      normalizedMessage.includes("username already exists") ||
      normalizedMessage.includes("username is already taken") ||
      (normalizedMessage.includes("username") &&
        normalizedMessage.includes("already exists"))
    ) {
      return "این نام کاربری قبلاً ثبت شده است.";
    }

    if (
      normalizedMessage.includes(
        "user with this email address already exists"
      ) ||
      normalizedMessage.includes(
        "user with that email address already exists"
      ) ||
      normalizedMessage.includes("a user with this email already exists") ||
      normalizedMessage.includes("a user with that email already exists") ||
      normalizedMessage.includes("email address already exists") ||
      normalizedMessage.includes("email already exists") ||
      normalizedMessage.includes("email is already taken") ||
      normalizedMessage.includes("this email is already in use") ||
      normalizedMessage.includes("account with this email already exists") ||
      (normalizedMessage.includes("email") &&
        normalizedMessage.includes("already exists"))
    ) {
      return "این ایمیل قبلاً ثبت شده است.";
    }

    if (
      normalizedMessage.includes("enter a valid email") ||
      normalizedMessage.includes("valid email address") ||
      normalizedMessage.includes("invalid email")
    ) {
      return "ایمیل وارد شده معتبر نیست.";
    }

    if (
      normalizedMessage.includes("this password is too short") ||
      normalizedMessage.includes("at least 8 characters")
    ) {
      return "رمز عبور باید حداقل ۸ کاراکتر داشته باشد.";
    }

    if (normalizedMessage.includes("this password is too common")) {
      return "این رمز عبور بیش از حد ساده و رایج است.";
    }

    if (normalizedMessage.includes("this password is entirely numeric")) {
      return "رمز عبور نباید فقط شامل عدد باشد.";
    }

    if (normalizedMessage.includes("the password is too similar to the")) {
      return "رمز عبور بیش از حد به اطلاعات حساب کاربری شما شبیه است.";
    }

    if (
      normalizedMessage.includes("old password is incorrect") ||
      normalizedMessage.includes("current password is incorrect") ||
      normalizedMessage.includes("wrong password") ||
      normalizedMessage.includes("incorrect password")
    ) {
      return "رمز عبور فعلی اشتباه است.";
    }

    if (
      normalizedMessage.includes("password fields didn't match") ||
      normalizedMessage.includes("passwords do not match") ||
      normalizedMessage.includes("password mismatch")
    ) {
      return "رمز عبور جدید و تکرار آن یکسان نیستند.";
    }

    if (
      normalizedMessage.includes("authentication credentials were not provided")
    ) {
      return "اطلاعات ورود معتبر نیست. لطفاً دوباره وارد حساب شوید.";
    }

    if (
      normalizedMessage.includes("token is invalid or expired") ||
      normalizedMessage.includes("token is expired") ||
      normalizedMessage.includes("token_not_valid")
    ) {
      return "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.";
    }

    if (
      normalizedMessage.includes("this field may not be blank") ||
      normalizedMessage.includes("this field is required") ||
      normalizedMessage.includes("required")
    ) {
      return "این فیلد الزامی است.";
    }

    return message;
  };

  const collectApiMessages = (value: any): string[] => {
    if (typeof value === "string") {
      return [value];
    }

    if (Array.isArray(value)) {
      return value.flatMap(collectApiMessages);
    }

    if (value && typeof value === "object") {
      return Object.values(value).flatMap(collectApiMessages);
    }

    return [];
  };

  const getApiErrorMessage = (err: any, fallback: string) => {
    const data = err?.response?.data;

    if (!data) {
      return fallback;
    }

    const messages = collectApiMessages(data);

    if (messages.length === 0) {
      return fallback;
    }

    const translatedMessages = messages
      .map(translateApiMessage)
      .filter((message, index, array) => array.indexOf(message) === index);

    return translatedMessages.join(" ");
  };

  const normalizeArray = (value: any) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.results)) return value.results;
    return [];
  };

  const normalizeNote = (item: any, index: number): UserNote => {
    return {
      id: item.id || index,
      username: item.username,
      book: item.book?.id || item.book || null,
      book_title:
        item.book_title || item.book?.title || item.title || "عنوان کتاب",
      author_name:
        item.author_name ||
        item.book?.author_name ||
        item.author ||
        item.book?.author?.name ||
        "نویسنده",
      cover_url: item.cover_url || item.book?.cover_url || null,
      text: item.text || "",
      created_at: item.created_at,
    };
  };

  const normalizeQuote = (item: any, index: number): UserQuote => {
    return {
      id: item.id || index,
      username: item.username,
      book: item.book?.id || item.book || null,
      book_title:
        item.book_title || item.book?.title || item.title || "عنوان کتاب",
      author_name:
        item.author_name ||
        item.book?.author_name ||
        item.author ||
        item.book?.author?.name ||
        "نویسنده",
      cover_url: item.cover_url || item.book?.cover_url || null,
      text: item.text || "",
      page_number: item.page_number ?? null,
      created_at: item.created_at,
    };
  };

  const extractNotes = (data: any): UserNote[] => {
    const possibleNotes =
      data?.notes ||
      data?.user_notes ||
      data?.recent_notes ||
      data?.profile?.notes ||
      data?.data?.notes ||
      [];

    return normalizeArray(possibleNotes).map(normalizeNote);
  };

  const extractQuotes = (data: any): UserQuote[] => {
    const possibleQuotes =
      data?.quotes ||
      data?.excerpts ||
      data?.user_quotes ||
      data?.recent_quotes ||
      data?.profile?.quotes ||
      data?.data?.quotes ||
      [];

    return normalizeArray(possibleQuotes).map(normalizeQuote);
  };

  const fetchUserProfileData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [meRes, listsRes, profileRes] = await Promise.all([
        authGet(`${apiBaseUrl}/accounts/me/`),
        authGet(`${apiBaseUrl}/books/reading-lists/`),
        authGet(`${apiBaseUrl}/books/profile/`).catch((err) => {
          console.log("PROFILE ENDPOINT ERROR:", err.response?.data || err);

          return { data: {} };
        }),
      ]);

      const accountData = meRes.data || {};
      const listsData = normalizeArray(listsRes.data);
      const profileResponseData = profileRes.data || {};

      setUser(accountData);
      setReadingLists(listsData);
      setProfileData(profileResponseData);
      setNotes(extractNotes(profileResponseData));
      setQuotes(extractQuotes(profileResponseData));
    } catch (err: any) {
      console.log("USER PROFILE ERROR:", err.response?.data || err.message);
      setErrorMessage("دریافت اطلاعات پروفایل با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLibrary = async (name: string) => {
    await authPost(`${apiBaseUrl}/books/reading-lists/`, {
      name,
    });

    await fetchUserProfileData();
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      setDeletingNoteId(noteId);
      setErrorMessage("");

      await authDelete(`${apiBaseUrl}/books/notes/${noteId}/`);

      setNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== noteId)
      );

      setProfileData((previousData) => {
        const currentCount = Number(
          previousData?.notes_count ?? previousData?.notesCount ?? notes.length
        );

        return {
          ...previousData,
          notes_count: Math.max(0, currentCount - 1),
          notesCount: Math.max(0, currentCount - 1),
        };
      });
    } catch (err: any) {
      console.log("DELETE NOTE ERROR:", err.response?.data || err.message);

      setErrorMessage("حذف یادداشت با خطا مواجه شد.");
      throw err;
    } finally {
      setDeletingNoteId(null);
    }
  };

  const handleDeleteQuote = async (quoteId: number) => {
    try {
      setDeletingQuoteId(quoteId);
      setErrorMessage("");

      await authDelete(`${apiBaseUrl}/books/quotes/${quoteId}/`);

      setQuotes((previousQuotes) =>
        previousQuotes.filter((quote) => quote.id !== quoteId)
      );
    } catch (err: any) {
      console.log("DELETE QUOTE ERROR:", err.response?.data || err.message);

      setErrorMessage("حذف بریده کتاب با خطا مواجه شد.");
      throw err;
    } finally {
      setDeletingQuoteId(null);
    }
  };

  const handleUpdateUsername = async (newUsername: string) => {
    try {
      const response = await authPatch(`${apiBaseUrl}/accounts/me/`, {
        username: newUsername,
      });

      const updatedUsername = response.data?.username || newUsername;

      setUser((previousUser) => ({
        ...previousUser,
        ...response.data,
        username: updatedUsername,
      }));

      setProfileData((previousData) => ({
        ...previousData,
        username: updatedUsername,
      }));

      setNotes((previousNotes) =>
        previousNotes.map((note) => ({
          ...note,
          username: updatedUsername,
        }))
      );

      setQuotes((previousQuotes) =>
        previousQuotes.map((quote) => ({
          ...quote,
          username: updatedUsername,
        }))
      );

      updateAuthUsername(updatedUsername);
    } catch (err: any) {
      throw new Error(
        getApiErrorMessage(err, "ویرایش نام کاربری با خطا مواجه شد.")
      );
    }
  };

  const handleUpdateEmail = async (newEmail: string) => {
    try {
      const response = await authPatch(`${apiBaseUrl}/accounts/me/`, {
        email: newEmail,
      });

      const updatedEmail = response.data?.email || newEmail;

      setUser((previousUser) => ({
        ...previousUser,
        ...response.data,
        email: updatedEmail,
      }));

      setProfileData((previousData) => ({
        ...previousData,
        email: updatedEmail,
      }));
    } catch (err: any) {
      throw new Error(getApiErrorMessage(err, "ویرایش ایمیل با خطا مواجه شد."));
    }
  };

  const handleUpdatePassword = async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await authPatch(`${apiBaseUrl}/accounts/me/change-password/`, {
        old_password: oldPassword,
        new_password: newPassword,
        new_password2: confirmPassword,
      });
    } catch (err: any) {
      throw new Error(
        getApiErrorMessage(err, "ویرایش رمز عبور با خطا مواجه شد.")
      );
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const getListCount = (list: ReadingList | undefined) => {
    if (!list) return 0;

    const count = Number(list.books_count);

    if (!Number.isNaN(count)) return count;

    return list.items?.length || 0;
  };

  const readList = readingLists.find((list) => {
    const type = String(list.list_type || "").toLowerCase();
    const name = list.name?.trim();

    return (
      type === "read" ||
      type === "finished" ||
      type === "done" ||
      name === "خوانده شده"
    );
  });

  const readBooksCount = getListCount(readList);

  const notesCount =
    Number(profileData?.notes_count) ||
    Number(profileData?.notesCount) ||
    notes.length ||
    0;

  const score = notes.length + quotes.length;

  const username =
    user?.username ||
    profileData?.username ||
    localStorage.getItem("username") ||
    "نام کاربری";

  const email = user?.email || profileData?.email || "";

  const rawProfileImage =
    user?.profile_image ||
    user?.profile_image_url ||
    user?.avatar ||
    profileData?.profile_image ||
    profileData?.profile_image_url ||
    profileData?.avatar ||
    null;

  const profileImage =
    normalizeProfileImageUrl(rawProfileImage) || defaultAvatar;

  if (loading) {
    return (
      <div className="bg-background min-h-screen text-foreground" dir="rtl">
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          در حال دریافت اطلاعات پروفایل...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground" dir="rtl">
      <div className="max-w-3xl mx-auto md:border-x md:border-border min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10">
          {errorMessage && (
            <div className="pt-4">
              <p className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center">
                {errorMessage}
              </p>
            </div>
          )}

          <Profile
            username={username}
            email={email}
            profileImage={profileImage}
            readBooksCount={readBooksCount}
            score={score}
            notesCount={notesCount}
            onUpdateUsername={handleUpdateUsername}
            onUpdateEmail={handleUpdateEmail}
            onUpdatePassword={handleUpdatePassword}
          />

          <Libraries
            readingLists={readingLists}
            onCreateLibrary={handleCreateLibrary}
          />

          <Notes
            notes={notes}
            onDelete={handleDeleteNote}
            deletingId={deletingNoteId}
          />

          <Excerpts
            quotes={quotes}
            onDelete={handleDeleteQuote}
            deletingId={deletingQuoteId}
          />
        </div>
      </div>
    </div>
  );
}
