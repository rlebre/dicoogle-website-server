const downloadTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>[subject]</title>
	<style type="text/css">
		body {
			width: 100% !important;
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
			margin: 0;
			padding: 0;
			font-family: Helvetica, Arial, sans-serif;
			font-size: 14px;
			font-weight: 200;
			line-height: 1.7857;
			letter-spacing: 0.075em;
			color: #333333;
			background-color: #fff;
		}

		table td {
			border-collapse: collapse;
		}

		table {
			border-collapse: collapse;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}


		@media only screen and (max-device-width: 480px) {

			a[href^="tel"],
			a[href^="sms"] {
				text-decoration: none;
				color: black;
				/* or whatever your want */
				pointer-events: none;
				cursor: default;
			}

			.mobile_link a[href^="tel"],
			.mobile_link a[href^="sms"] {
				text-decoration: default;
				color: orange !important;
				/* or whatever your want */
				pointer-events: auto;
				cursor: default;
			}
		}


		@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {

			.mobile_link a[href^="tel"],
			.mobile_link a[href^="sms"] {
				text-decoration: default;
				color: orange !important;
				pointer-events: auto;
				cursor: default;
			}
		}

		p {
			margin: 0;
			color: #555;
			font-family: Helvetica, Arial, sans-serif;
			font-size: 14px;
			line-height: 160%;
		}

		.btn-primary {
			color: #fff !important;
			background-color: #337ab7;
			border-color: #2e6da4;
		}

		.btn {
			display: inline-block;
			padding: 6px 12px;
			margin-bottom: 0;
			font-size: 14px;
			font-weight: 400;
			line-height: 1.42857143;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			-ms-touch-action: manipulation;
			touch-action: manipulation;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			background-image: none;
			border: 1px solid transparent;
			border-radius: 4px;
		}

		a {
			color: #000;
			-webkit-transition: all 0.2s ease-in-out;
			-moz-transition: all 0.2s ease-in-out;
			-ms-transition: all 0.2s ease-in-out;
			-o-transition: all 0.2s ease-in-out;
			transition: all 0.2s ease-in-out;
		}

		a:hover {
			color: #000;
		}

		a,
		a:hover,
		a:active,
		a:focus {
			outline: 0;
			/* border: 0; */
			text-decoration: none;
		}

		.btn-primary.active,
		.btn-primary.focus,
		.btn-primary:active,
		.btn-primary:focus,
		.btn-primary:hover,
		.open>.dropdown-toggle.btn-primary {
			color: #fff;
			background-color: #286090;
			border-color: #204d74;
		}

		h2 {
			color: #181818;
			font-family: Helvetica, Arial, sans-serif;
			font-size: 22px;
			font-weight: normal;
		}

		.bgItem {
			background: #F4A81C;
		}

		.bgBody {
			background: #ffffff;
		}

		img {
			max-width: 50%;
			height: auto;
			display: block;
			margin: 0 auto;
			margin-bottom: 20px;
		}
	</style>

	<script type="colorScheme" class="swatch active">
</script>

</head>

<body>
	<!-- Wrapper/Container Table: Use a wrapper table to control the width and the background color consistently of your email. Use this approach instead of setting attributes on the body tag. -->
	<table cellpadding="0" width="100%" cellspacing="0" border="0" id="backgroundTable" class='bgBody'>
		<tr>
			<td>

				<!-- Tables are the most common way to format your email consistently. Set your table widths inside cells and in most cases reset cellpadding, cellspacing, and border to zero. Use nested tables as a way to space effectively in your message. -->

				<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"
					style="border-collapse:collapse;">
					<tr>
						<td class='movableContentContainer'>

							<div class='movableContent'>
								<img src="cid:logo" alt='Logo' data-default="placeholder" />

							</div>

							<div class='movableContent' style="background-color: #cbe0f2;">
								<table cellpadding="0" cellspacing="0" border="0" align="center" width="600">
									<tr>
										<td width="100%" colspan="3" align="center"
											style="padding-bottom:10px;padding-top:25px;">
											<div class="contentEditableContainer contentTextEditable">
												<div class="contentEditable">
													<h2>Welcome aboard!</h2>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td width="100">&nbsp;</td>
										<td width="600" style="padding-bottom:5px;">
											<div class="contentEditableContainer contentTextEditable">
												<div class="contentEditable">

													<p>Dear [username],</p>
													<br>
													<p>Your request to download
														<b>[resource]</b> was accepted. Please download using the
														link below.
													</p>
												</div>
											</div>
										</td>
										<td width="100">&nbsp;</td>
									</tr>
									<tr>
										<td width="100">&nbsp;</td>
										<td width="400" align="center" style="padding-top:25px;padding-bottom:50px;">
											<table cellpadding="0" cellspacing="0" border="0" align="center" width="200"
												height="50">
												<tr>
													<td align="center" style="border-radius:4px;" width="200"
														height="50">
														<a class="btn btn-primary" href="[download_link]"
															role="button" target="_blank">Download</a>
													</td>
												</tr>
											</table>
										</td>
										<td width="100">&nbsp;</td>
									</tr>
									<tr>
										<td width="100">&nbsp;</td>
										<td width="600" style="padding-bottom:5px;">
											<div class="contentEditableContainer contentTextEditable">
												<div class="contentEditable">
													<p>Meanwhile, you might be interested in checking out our <a
															href="https://bioinformatics-ua.github.io/dicoogle-learning-pack/">Learning
															Pack</a>.</p>
													<br>
													<p>If you have any question, do not hesitate contacting us by
														filling the form available <a
															href="http://dicoogle.com/about/#contact" role="button"
															target="_blank">here</a>.</p>
													<br>
												</div>
											</div>
										</td>
										<td width="100">&nbsp;</td>
									</tr>
									<tr>
										<td width="100">&nbsp;</td>
										<td width="600" style="padding-bottom:25px;">
											<div class="contentEditableContainer contentTextEditable">
												<div class="contentEditable">
													<p>See you next download!</p>
													<p>Dicoogle Team</p>
												</div>
											</div>
										</td>
										<td width="100">&nbsp;</td>
									</tr>
								</table>
							</div>
						</td>
					</tr>
				</table>
				<!-- END BODY -->

			</td>
		</tr>
	</table>
	<!-- End of wrapper table -->
</body>

</html>`

const buildTemplate = (name, subject, resource, download_link) => {
	return downloadTemplate
		.replace(/\[username\]/g, name)
		.replace(/\[subject\]/g, subject)
		.replace(/\[resource\]/g, resource)
		.replace(/\[download_link\]/g, download_link)

}

module.exports = { template: downloadTemplate, buildTemplate }