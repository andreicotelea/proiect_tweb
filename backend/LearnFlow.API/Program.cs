using LearnFlow.BusinessLayer;
using LearnFlow.BusinessLayer.Core;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;

var builder = WebApplication.CreateBuilder(args);

// Set connection string for all contexts
DbSession.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Session-based auth
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
});

// BusinessLogic factory
builder.Services.AddSingleton<BusinessLogic>();

// Services via factory
builder.Services.AddScoped<IAuthService>(sp => sp.GetRequiredService<BusinessLogic>().GetAuthActions());
builder.Services.AddScoped<ILessonService>(sp => sp.GetRequiredService<BusinessLogic>().GetLessonActions());
builder.Services.AddScoped<IUserService>(sp => sp.GetRequiredService<BusinessLogic>().GetUserActions());
builder.Services.AddScoped<ICategoryService>(sp => sp.GetRequiredService<BusinessLogic>().GetCategoryActions());
builder.Services.AddScoped<IProgressService>(sp => sp.GetRequiredService<BusinessLogic>().GetProgressActions());
builder.Services.AddScoped<ILeaderboardService>(sp => sp.GetRequiredService<BusinessLogic>().GetLeaderboardActions());

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.UseSession();
app.MapControllers();

app.Urls.Add("http://localhost:5000");
app.Run();
