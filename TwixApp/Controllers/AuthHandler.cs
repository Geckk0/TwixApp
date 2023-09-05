using System.Globalization;

namespace TwixApp.Controllers
{
    public class AuthHandler
    {
        private const int _tokenLength = 64;
        private static Random random = new Random();

        public static string CreateToken(int userId)
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string tokenString =  new string(Enumerable.Repeat(chars, _tokenLength)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            var tokenChar = tokenString.ToCharArray();//Split string to replace parts with new values
            var userIdChar = userId.ToString().ToCharArray();
            int userIdLength = userIdChar.Length;
            int[] userIdPositions = new int[6];

            int tokenType = random.Next(4);
            string dateTime = DateTime.UtcNow.ToString();//Set culture for same formating
            var dateChar = dateTime.ToCharArray();
            HashSet<char> set = new();

            switch (tokenType)
            {
                case 0:
                    tokenChar[4] = dateChar[8]; tokenChar[52] = dateChar[9];//Input day
                    tokenChar[32] = dateChar[5]; tokenChar[12] = dateChar[6];//Input month
                    tokenChar[53] = dateChar[2]; tokenChar[41] = dateChar[3];//Input year
                    tokenChar[34] = dateChar[11]; tokenChar[8] = dateChar[12];//Input hour
                    tokenChar[5] = tokenType.ToString().ToCharArray()[0];//Input type of token creation
                    tokenChar[43] = userIdLength.ToString().ToCharArray()[0];//Input length of userId

                    userIdPositions[0] = 23; userIdPositions[1] = 55; userIdPositions[2] = 43; userIdPositions[3] = 12; userIdPositions[4] = 6; userIdPositions[5] = 3;//positions for userId

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenChar[userIdPositions[i]] = userIdChar[i];
                    }
                    break;
                case 1:
                    tokenChar[6] = dateChar[8]; tokenChar[62] = dateChar[9];
                    tokenChar[53] = dateChar[5]; tokenChar[2] = dateChar[6];
                    tokenChar[23] = dateChar[2]; tokenChar[34] = dateChar[3];
                    tokenChar[44] = dateChar[11]; tokenChar[60] = dateChar[12];
                    tokenChar[5] = tokenType.ToString().ToCharArray()[0];
                    tokenChar[11] = userIdLength.ToString().ToCharArray()[0];

                    userIdPositions[0] = 54; userIdPositions[1] = 42; userIdPositions[2] = 24; userIdPositions[3] = 32; userIdPositions[4] = 49; userIdPositions[5] = 20;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenChar[userIdPositions[i]] = userIdChar[i];
                    }
                    break;
                case 2:
                    tokenChar[35] = dateChar[8]; tokenChar[51] = dateChar[9];
                    tokenChar[54] = dateChar[5]; tokenChar[33] = dateChar[6];
                    tokenChar[62] = dateChar[2]; tokenChar[61] = dateChar[3];
                    tokenChar[23] = dateChar[11]; tokenChar[32] = dateChar[12];
                    tokenChar[5] = tokenType.ToString().ToCharArray()[0];
                    tokenChar[48] = userIdLength.ToString().ToCharArray()[0];

                    userIdPositions[0] = 57; userIdPositions[1] = 36; userIdPositions[2] = 28; userIdPositions[3] = 61; userIdPositions[4] = 37; userIdPositions[5] = 42;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenChar[userIdPositions[i]] = userIdChar[i];
                    }
                    break;
                case 3:
                    tokenChar[36] = dateChar[8]; tokenChar[35] = dateChar[9];
                    tokenChar[60] = dateChar[5]; tokenChar[24] = dateChar[6];
                    tokenChar[63] = dateChar[2]; tokenChar[54] = dateChar[3];
                    tokenChar[13] = dateChar[11]; tokenChar[1] = dateChar[12];
                    tokenChar[5] = tokenType.ToString().ToCharArray()[0];
                    tokenChar[37] = userIdLength.ToString().ToCharArray()[0];

                    userIdPositions[0] = 45; userIdPositions[1] = 48; userIdPositions[2] = 52; userIdPositions[3] = 29; userIdPositions[4] = 30; userIdPositions[5] = 9;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenChar[userIdPositions[i]] = userIdChar[i];
                    }
                    break;
            }

            tokenString = new string(tokenChar);

            return tokenString;
        }

        public static bool VerifyToken(string token, int ?userId)
        {
            if (token == null || token.Length != 64) return false;

            char[] tokenChar = token.ToCharArray();
            int tokenType = tokenChar[5];
            string day = "00", month = "00", year = "00", hour = "00", dateString;
            int userIdLength, tokenUserId = 0;
            int[] userIdPositions = new int[6];

            switch (tokenType)
            {
                case 0:
                    day = tokenChar[4].ToString() + tokenChar[52].ToString();//Extract day
                    month = tokenChar[32].ToString() + tokenChar[12].ToString();//Extract month
                    year = tokenChar[53].ToString() + tokenChar[41].ToString();//Extract year
                    hour = tokenChar[34].ToString() + tokenChar[8].ToString();//Extract hour
                    userIdLength = tokenChar[43];//Extract length of userId 
                    userIdPositions[0] = 23; userIdPositions[1] = 55; userIdPositions[2] = 43; userIdPositions[3] = 12; userIdPositions[4] = 6; userIdPositions[5] = 3;//positions for userId

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 1:
                    day = tokenChar[6].ToString() + tokenChar[62].ToString();
                    month = tokenChar[53].ToString() + tokenChar[2].ToString();
                    year = tokenChar[23].ToString() + tokenChar[34].ToString();
                    hour = tokenChar[44].ToString() + tokenChar[60].ToString();
                    userIdLength = tokenChar[11];
                    userIdPositions[0] = 54; userIdPositions[1] = 42; userIdPositions[2] = 24; userIdPositions[3] = 32; userIdPositions[4] = 49; userIdPositions[5] = 20;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 2:
                    day = tokenChar[35].ToString() + tokenChar[51].ToString();
                    month = tokenChar[54].ToString() + tokenChar[33].ToString();
                    year = tokenChar[62].ToString() + tokenChar[64].ToString();
                    hour = tokenChar[23].ToString() + tokenChar[32].ToString();
                    userIdLength = tokenChar[48];
                    userIdPositions[0] = 57; userIdPositions[1] = 36; userIdPositions[2] = 28; userIdPositions[3] = 61; userIdPositions[4] = 37; userIdPositions[5] = 42;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 3:
                    day = tokenChar[36].ToString() + tokenChar[35].ToString();
                    month = tokenChar[60].ToString() + tokenChar[24].ToString();
                    year = tokenChar[63].ToString() + tokenChar[54].ToString();
                    hour = tokenChar[13].ToString() + tokenChar[1].ToString();
                    userIdLength = tokenChar[37];
                    userIdPositions[0] = 45; userIdPositions[1] = 48; userIdPositions[2] = 52; userIdPositions[3] = 29; userIdPositions[4] = 30; userIdPositions[5] = 9;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
            }

            dateString = $"{day} {month} {year} {hour}:00";
            DateTime dateTime = DateTime.Parse(dateString);
            DateTime currentDateTime = DateTime.UtcNow;

            if (currentDateTime.Year != dateTime.Year ||
                currentDateTime.Month != dateTime.Month ||
                currentDateTime.Day != dateTime.Day ||
                currentDateTime.Hour - dateTime.Hour > 2)
                return false;
            else if (userId != null && userId != tokenUserId)
                return false;

            return true;
        }

        public static int GetUserFromToken(string token)
        {
            var tokenChar = token.ToCharArray();
            int tokenType = tokenChar[5];
            int userIdLength, tokenUserId = 0;
            int[] userIdPositions = new int[6]; 
            
            
            switch (tokenType)
            {
                case 0:
                    userIdLength = tokenChar[43];
                    userIdPositions[0] = 23; userIdPositions[1] = 55; userIdPositions[2] = 43; userIdPositions[3] = 12; userIdPositions[4] = 6; userIdPositions[5] = 3;//positions for userId

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 1:
                    userIdLength = tokenChar[11];
                    userIdPositions[0] = 54; userIdPositions[1] = 42; userIdPositions[2] = 24; userIdPositions[3] = 32; userIdPositions[4] = 49; userIdPositions[5] = 20;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 2:
                    userIdLength = tokenChar[48];
                    userIdPositions[0] = 57; userIdPositions[1] = 36; userIdPositions[2] = 28; userIdPositions[3] = 61; userIdPositions[4] = 37; userIdPositions[5] = 42;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 3:
                    userIdLength = tokenChar[37];
                    userIdPositions[0] = 45; userIdPositions[1] = 48; userIdPositions[2] = 52; userIdPositions[3] = 29; userIdPositions[4] = 30; userIdPositions[5] = 9;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
            }

            return tokenUserId;
        }
    }
}
