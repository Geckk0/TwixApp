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
            string dateTime = DateTime.UtcNow.ToString(new CultureInfo("en-GB"));//Set culture for same formating
            var dateChar = dateTime.ToCharArray();

            switch (tokenType)
            {
                case 0:
                    tokenChar[4] = dateChar[0]; tokenChar[52] = dateChar[1];//Input day
                    tokenChar[32] = dateChar[3]; tokenChar[12] = dateChar[4];//Input month
                    tokenChar[53] = dateChar[8]; tokenChar[41] = dateChar[9];//Input year
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
                    tokenChar[6] = dateChar[0]; tokenChar[62] = dateChar[1];
                    tokenChar[53] = dateChar[3]; tokenChar[2] = dateChar[4];
                    tokenChar[23] = dateChar[8]; tokenChar[34] = dateChar[9];
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
                    tokenChar[35] = dateChar[0]; tokenChar[51] = dateChar[1];
                    tokenChar[54] = dateChar[3]; tokenChar[33] = dateChar[4];
                    tokenChar[62] = dateChar[8]; tokenChar[61] = dateChar[9];
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
                    tokenChar[36] = dateChar[0]; tokenChar[35] = dateChar[1];
                    tokenChar[60] = dateChar[3]; tokenChar[24] = dateChar[4];
                    tokenChar[63] = dateChar[8]; tokenChar[54] = dateChar[9];
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

            var tokenChar = token.ToCharArray();
            int tokenType = int.Parse(tokenChar[5].ToString());
            char[] day = new char[2], month = new char[2], year = new char[2], hour = new char[2];
            string dateString;
            int userIdLength = 0, tokenUserId = 0;
            int[] userIdPositions = new int[6];

            switch (tokenType)
            {
                case 0:
                    day[0] = tokenChar[4]; day[1] = tokenChar[52];//Extract day
                    month[0] = tokenChar[32]; month[1] = tokenChar[12];//Extract month
                    year[0] = tokenChar[53]; year[1] = tokenChar[41];//Extract year
                    hour[0] = tokenChar[34]; hour[1] = tokenChar[8];//Extract hour
                    userIdLength = int.Parse(tokenChar[43].ToString());//Extract length of userId 
                    userIdPositions[0] = 23; userIdPositions[1] = 55; userIdPositions[2] = 43; userIdPositions[3] = 12; userIdPositions[4] = 6; userIdPositions[5] = 3;//positions for userId

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 1:
                    day[0] = tokenChar[6]; day[1] = tokenChar[62];
                    month[0] = tokenChar[53]; month[1] = tokenChar[2];
                    year[0] = tokenChar[23]; year[1] = tokenChar[34];
                    hour[0] = tokenChar[44]; hour[1] = tokenChar[60];
                    userIdLength = int.Parse(tokenChar[11].ToString());
                    userIdPositions[0] = 54; userIdPositions[1] = 42; userIdPositions[2] = 24; userIdPositions[3] = 32; userIdPositions[4] = 49; userIdPositions[5] = 20;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 2:
                    day[0] = tokenChar[35]; day[1] = tokenChar[51];
                    month[0] = tokenChar[54]; month[1] = tokenChar[33];
                    year[0] = tokenChar[62]; year[1] = tokenChar[58];
                    hour[0] = tokenChar[23]; hour[1] = tokenChar[32];
                    userIdLength = int.Parse(tokenChar[48].ToString());
                    userIdPositions[0] = 57; userIdPositions[1] = 36; userIdPositions[2] = 28; userIdPositions[3] = 61; userIdPositions[4] = 37; userIdPositions[5] = 42;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 3:
                    day[0] = tokenChar[36]; day[1] = tokenChar[35];
                    month[0] = tokenChar[60]; month[1] = tokenChar[24];
                    year[0] = tokenChar[63]; year[1] = tokenChar[54];
                    hour[0] = tokenChar[13]; hour[1] = tokenChar[1];
                    userIdLength = int.Parse(tokenChar[37].ToString());
                    userIdPositions[0] = 45; userIdPositions[1] = 48; userIdPositions[2] = 52; userIdPositions[3] = 29; userIdPositions[4] = 30; userIdPositions[5] = 9;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
            }

            dateString = $"20{new string(year)}-{new string(month)}-{new string(day)}T{new string(hour)}:00";
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
            int tokenType = int.Parse(tokenChar[5].ToString());
            int userIdLength, tokenUserId = 0;
            int[] userIdPositions = new int[6]; 
            
            
            switch (tokenType)
            {
                case 0:
                    userIdLength = int.Parse(tokenChar[43].ToString());
                    userIdPositions[0] = 23; userIdPositions[1] = 55; userIdPositions[2] = 43; userIdPositions[3] = 12; userIdPositions[4] = 6; userIdPositions[5] = 3;//positions for userId

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 1:
                    userIdLength = int.Parse(tokenChar[11].ToString());
                    userIdPositions[0] = 54; userIdPositions[1] = 42; userIdPositions[2] = 24; userIdPositions[3] = 32; userIdPositions[4] = 49; userIdPositions[5] = 20;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 2:
                    userIdLength = int.Parse(tokenChar[48].ToString());
                    userIdPositions[0] = 57; userIdPositions[1] = 36; userIdPositions[2] = 28; userIdPositions[3] = 61; userIdPositions[4] = 37; userIdPositions[5] = 42;

                    for (int i = 0; i < userIdLength; i++)
                    {
                        tokenUserId = int.Parse(tokenUserId.ToString() + tokenChar[userIdPositions[i]].ToString());
                    }
                    break;
                case 3:
                    userIdLength = int.Parse(tokenChar[37].ToString());
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
