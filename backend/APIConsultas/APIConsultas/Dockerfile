# Use a imagem oficial do .NET SDK para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /APIConsultas

# Copie o código fonte e restaure as dependências
COPY . ./
RUN dotnet restore

# Compile a aplicação
RUN dotnet publish -c Release -o out

# Comando para executar a aplicação
ENTRYPOINT ["dotnet", "APIConsultas.dll"]