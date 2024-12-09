interface UserProfileProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
    createdAt: string;
    pronouns: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start space-x-4">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">{user.name}</h2>
          {user.pronouns && (
            <span className="text-sm text-gray-500">({user.pronouns})</span>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-1">{user.bio}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold">{user.repositories.totalCount}</div>
          <div className="text-sm text-gray-500">Repositories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{user.followers.totalCount}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{user.following.totalCount}</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
} 