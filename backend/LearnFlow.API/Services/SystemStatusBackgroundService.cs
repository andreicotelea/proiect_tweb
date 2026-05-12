using LearnFlow.DataAccessLayer.Context;

namespace LearnFlow.API.Services
{
    public static class SystemStatusBackgroundService
    {
        private static readonly TimeSpan Interval = TimeSpan.FromSeconds(30);

        public static void Start()
        {
            Task.Run(async () =>
            {
                await RefreshAsync();
                while (true)
                {
                    await Task.Delay(Interval);
                    await RefreshAsync();
                }
            });
        }

        private static async Task RefreshAsync()
        {
            bool dbOnline = false;
            int? dbLatencyMs = null;
            try
            {
                using var context = new AppDbContext();
                var sw = System.Diagnostics.Stopwatch.StartNew();
                dbOnline = await context.Database.CanConnectAsync();
                sw.Stop();
                dbLatencyMs = (int)sw.ElapsedMilliseconds;
            }
            catch { }

            SystemStatusService.Update(new SystemHealthSnapshot
            {
                DbOnline = dbOnline,
                DbLatencyMs = dbLatencyMs,
                CheckedAt = DateTime.UtcNow,
            });
        }
    }
}
