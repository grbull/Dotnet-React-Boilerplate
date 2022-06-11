FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/DRB.Web/DRB.Web.csproj", "DRB.Web/"]
RUN dotnet restore "src/DRB.Web/DRB.Web.csproj"
COPY . .
WORKDIR "/src/DRB.Web"
RUN dotnet build "DRB.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DRB.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DRB.Web.dll"]
