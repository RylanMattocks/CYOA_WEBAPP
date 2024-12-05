using Microsoft.EntityFrameworkCore;
using Game.Data;
using Game.Data.Repos;
using Game.API.Services;
using Game.Utils.Mapper;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<GameContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("GameDB"))
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

string dialogueFilePath = Path.Combine(Directory.GetParent(builder.Environment.ContentRootPath).FullName, builder.Configuration.GetValue<string>("GameSettings:DialogueFilePath"));
builder.Services.AddSingleton(dialogueFilePath);

builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IGameService, GameService>();

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddSwaggerGen();

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.Run();