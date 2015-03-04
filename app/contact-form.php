<?php
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputPhone']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputPhone']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'contact.fill-fields');
        echo json_encode($data);
        exit;
    }
    $name = $_POST['inputName'];
    $email = $_POST['inputEmail'];
    $phone = $_POST['inputPhone'];
    $message = nl2br($_POST['inputMessage']);

    //create an instance of PHPMailer
    $mail = new PHPMailer();
    $mail->isSMTP();

    $mail->Host       = "smtp.kazamax.com"; // SMTP server
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->Port       = 587;                    // set the SMTP port for the GMAIL server
    $mail->Username   = "site@kazamax.com"; // SMTP account username
    $mail->Password   = "ifkvanersborg1";        // SMTP account password
    $mail->AddAddress('johan.fager@kazamax.com', 'Johan Fager');
    //$mail->AddAddress('aj@alanjhonnes.com', 'Johan Fager');
    $mail->Sender = 'site@kazamax.com';
    $mail->SetFrom($email, $name);
    $mail->Subject = 'Contato do site Kazamax';
    $mail->msgHTML("<h2>Contato do site:</h2>
                    <p><strong>Email:</strong> $email</p>
                    <p><strong>Tel:</strong> $phone</p>
                    <p><strong>Mensagem:</strong> $message</p>");

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'contact.server-error');
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'contact.success');
    echo json_encode($data);

} else {
    $data = array('success' => false, 'message' => 'contact.fill-fields');
    echo json_encode($data);

}
