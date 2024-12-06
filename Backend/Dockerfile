# Start with a .NET 8 SDK on existing OS
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /app

# Copy over source code including Models and Tests
COPY Game.API/ /app/Game.API
COPY Game.Data/ /app/Game.Data
COPY Game.Models/ /app/Game.Models 
COPY Game.Utils/ /app/Game.Utils

# Restore dependencies for the API project
RUN dotnet restore Game.API/Game.csproj

# Run and publish .NET artifact
RUN dotnet publish Game.API/Game.csproj -c Release -o dist 

# Make new layer 
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS run 

# Set the correct environment variable for ASP.NET Core 8
ENV ASPNETCORE_HTTP_PORTS=80

WORKDIR /app

# Copy over artifacts from build layer
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# What to do when docker run is called
CMD ["dotnet", "Game.dll"]