package org.mensajes.ventanas;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.mensajes.network.GetCallback;
import org.mensajes.parser.ParseMSG;
import org.mensajes.ventanas.estilo.Paleta;
//----------------FE------------------------------------------------------------------
// Class where the window goes
public class VentanaPrincipal extends JFrame {
	
	// Class constants
	private final int ANCHO = 500;
	private final int ALTO = 600;
	
	private final String TITULO = "Messages";
	
	private final int DEAULT_CLOP = JFrame.EXIT_ON_CLOSE;
	
	private final boolean REDIMENSIONABLE = true;
	
	// JFrame components
	private JPanel panel;
	
	// CLASS PARAMETERS window constructor
	public VentanaPrincipal() {
		// We configure the JFrame
		setSize(ANCHO, ALTO);
		setTitle(TITULO);
		setDefaultCloseOperation(DEAULT_CLOP);
		setResizable(REDIMENSIONABLE);
		
		// We start the components
		panel = new marcoVentanaPrincipal();
		// We added the components
		add(panel);
	}
	
	// Show window
	public void mostrarVentana() {
		setVisible(true);
	}
	
	// Show the window if show equals true, if not, hide it
	public void mostrarVentana(boolean mostrar) {
		setVisible(mostrar);
	}
	
}

class marcoVentanaPrincipal extends JPanel {

	// Class variables
	private JEditorPane conversacion;
	private JTextField entrada;
	
	// Message stack
	private String mensajes;
	
	// Constructor of the class we initiate, configure and show
	public marcoVentanaPrincipal() {
		super(new BorderLayout());
		
		conversacion = new JEditorPane();
		entrada = new JTextField();
		
		mensajes = "";
		
		// We configure the panel where the conversation will take place
		conversacion.setContentType("text/html");
		conversacion.setEditable(false);
		conversacion.setBackground(Paleta.COLOR_PRIMARIO);
		
		conversacion.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 12));
		conversacion.setForeground(Color.WHITE);
		conversacion.putClientProperty(JEditorPane.HONOR_DISPLAY_PROPERTIES, Boolean.TRUE);
		conversacion.setText("");
		
		// We configure the text input
		entrada.setBackground(Paleta.COLOR_SECUNDARIO);
		entrada.setBorder(BorderFactory.createMatteBorder(1, 0, 0, 0, Paleta.COLOR_CLARO));
		entrada.setForeground(Color.white);
		entrada.setPreferredSize(new Dimension(0,30));
		
		entrada.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				enviarMensaje(entrada.getText());
			}
		});
		
		// We added the elements to the panel
		add(conversacion, BorderLayout.CENTER);
		add(entrada, BorderLayout.SOUTH);
		
		// We accept messages on the server
		Servidor.aceptarMensajes(new GetCallback() {
			
			@Override
			public String send() {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public void get(String msg) {
				recivirMensaje(msg);
			}
		});
		
	}
	//--------------------FE-------------------------------------------------------------------------




	
	
}