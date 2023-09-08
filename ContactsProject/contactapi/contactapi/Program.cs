using contactapi.Services;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var firebaseProjectName = builder.Configuration["AppSettings:FirebaseConfig:project_id"];

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ContactAppContext>(opt =>
    opt.UseInMemoryDatabase("ContactAppDb"));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200/");
                      });
});

builder.Services.AddSwaggerGen();


Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"./firebase-config.json");

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("./firebase-config.json"),
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(jwtOptions =>
{
    jwtOptions.Authority = $"https://securetoken.google.com/{firebaseProjectName}";

    jwtOptions.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = $"https://securetoken.google.com/{firebaseProjectName}",
    ValidateAudience = true,
        ValidAudience = firebaseProjectName,
        ValidateLifetime = true
    };

});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin());
}

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

