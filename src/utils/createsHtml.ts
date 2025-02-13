function createsHtml() {
  return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Compra</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #fff;
            background-color: #f59e0b;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            opacity: 0.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Confirmação de Compra</div>
        <div class="message">
            Obrigado por comprar sua partitura musical conosco! Clique no botão abaixo para baixar seu arquivo.
        </div>
        <a href="{{DOWNLOAD_LINK}}" class="button">Baixar Partitura</a>
        <div class="footer">
            Se você tiver alguma dúvida, entre em contato com nosso suporte.<br>
            &copy; 2025 Sua Empresa - Todos os direitos reservados.
        </div>
    </div>
</body>
</html>
    `;
}

export default createsHtml;
